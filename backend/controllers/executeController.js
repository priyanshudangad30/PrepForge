const axios = require("axios");

const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const util = require("util");

const execPromise = util.promisify(exec);

// Language ID mapping for Judge0
const LANGUAGE_IDS = {
  javascript: 63, // Node.js
  python: 71,     // Python 3
  cpp: 54,        // C++ (GCC 9.2.0)
};

// @desc    Execute code via Judge0 API or Locally
// @route   POST /api/execute
const executeCode = async (req, res) => {
  try {
    const { code, language, stdin } = req.body;

    if (!code || !language) {
      return res.status(400).json({ message: "Code and language are required" });
    }

    const languageId = LANGUAGE_IDS[language];
    if (!languageId) {
      return res.status(400).json({ message: "Unsupported language" });
    }

    // If Judge0 API key is configured, use RapidAPI
    if (process.env.JUDGE0_API_KEY && process.env.JUDGE0_API_KEY !== "your_rapidapi_key_here") {
      // Submit code to Judge0
      const submitResponse = await axios.post(
        `${process.env.JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
        {
          source_code: code,
          language_id: languageId,
          stdin: stdin || "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
            "X-RapidAPI-Host": process.env.JUDGE0_API_HOST,
          },
        }
      );

      const result = submitResponse.data;

      res.json({
        stdout: result.stdout || "",
        stderr: result.stderr || "",
        compile_output: result.compile_output || "",
        status: result.status?.description || "Unknown",
        time: result.time || "N/A",
        memory: result.memory ? `${result.memory} KB` : "N/A",
      });
    } else {
      // Execute locally
      const result = await executeLocally(code, language, stdin);
      res.json(result);
    }
  } catch (error) {
    console.error("Execute error:", error.message);

    if (error.response) {
      return res.status(error.response.status).json({
        message: "Code execution failed",
        error: error.response.data,
      });
    }

    res.status(500).json({ message: "Server error during code execution" });
  }
};

async function executeLocally(code, language, stdin) {
  const tempDir = path.join(__dirname, "..", "temp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const id = crypto.randomBytes(16).toString("hex");
  let fileExt = "";
  let runCmd = "";

  if (language === "javascript") {
    fileExt = "js";
  } else if (language === "python") {
    fileExt = "py";
  } else if (language === "cpp") {
    fileExt = "cpp";
  }

  const filePath = path.join(tempDir, `${id}.${fileExt}`);
  const inputPath = path.join(tempDir, `${id}.in`);

  fs.writeFileSync(filePath, code);
  fs.writeFileSync(inputPath, stdin || "");

  try {
    let output = { stdout: "", stderr: "", compile_output: "", status: "Accepted" };

    if (language === "javascript") {
      runCmd = `node ${filePath} < ${inputPath}`;
    } else if (language === "python") {
      runCmd = `python ${filePath} < ${inputPath}`;
    } else if (language === "cpp") {
      const exePath = path.join(tempDir, `${id}.exe`);
      try {
        await execPromise(`g++ ${filePath} -o ${exePath}`);
        runCmd = `${exePath} < ${inputPath}`;
      } catch (err) {
        output.status = "Compilation Error";
        output.compile_output = err.stderr || err.message;
        return formatLocalResult(output);
      }
    }

    try {
      const { stdout, stderr } = await execPromise(runCmd, { timeout: 5000 });
      output.stdout = stdout;
      output.stderr = stderr;
      if (stderr) output.status = "Runtime Error";
    } catch (err) {
      output.stdout = err.stdout;
      output.stderr = err.stderr || err.message;
      output.status = err.killed ? "Time Limit Exceeded" : "Runtime Error";
    }

    return formatLocalResult(output);
  } finally {
    // Cleanup
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
    if (language === "cpp") {
      const exePath = path.join(tempDir, `${id}.exe`);
      if (fs.existsSync(exePath)) fs.unlinkSync(exePath);
    }
  }
}

function formatLocalResult(output) {
  return {
    stdout: output.stdout || "",
    stderr: output.stderr || "",
    compile_output: output.compile_output || "",
    status: output.status,
    time: "N/A (Local)",
    memory: "N/A (Local)",
    isDemoMode: false
  };
}

module.exports = { executeCode };
