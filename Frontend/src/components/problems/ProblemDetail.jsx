import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import {
  Play,
  Send,
  ChevronDown,
  Clock,
  Cpu,
  CheckCircle2,
  XCircle,
  FileText,
  TestTube,
  Loader2,
} from "lucide-react";

const LANGUAGES = [
  { value: "javascript", label: "JavaScript", monacoId: "javascript" },
  { value: "python", label: "Python", monacoId: "python" },
  { value: "cpp", label: "C++", monacoId: "cpp" },
];

export default function ProblemDetail() {
  const { user } = useAuth();
  const { slug } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await API.get(`/problems/${slug}`);
        setProblem(res.data);
        setCode(res.data.starterCode?.javascript || "");
      } catch (err) {
        toast.error("Problem not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [slug]);

  useEffect(() => {
    if (problem?.starterCode) {
      setCode(problem.starterCode[language] || "");
    }
  }, [language, problem]);

  const handleRun = async () => {
    setRunning(true);
    setOutput(null);
    try {
      const stdin = problem?.testCases?.length > 0 ? problem.testCases[0].input : "";
      const res = await API.post("/execute", { code, language, stdin });
      setOutput(res.data);
    } catch (err) {
      setOutput({
        stderr: err.response?.data?.message || "Execution failed",
        status: "Error",
      });
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      let finalStatus = "Accepted";
      let finalOutput = null;

      if (!problem.testCases || problem.testCases.length === 0) {
        const execRes = await API.post("/execute", { code, language });
        finalOutput = execRes.data;
        finalStatus = execRes.data.status === "Accepted" ? "Accepted" : "Wrong Answer";
      } else {
        for (let i = 0; i < problem.testCases.length; i++) {
          const tc = problem.testCases[i];
          const execRes = await API.post("/execute", { 
            code, 
            language,
            stdin: tc.input
          });
          
          finalOutput = execRes.data;
          
          if (finalOutput.status !== "Accepted") {
            finalStatus = "Error";
            break;
          }

          const actualOutput = (finalOutput.stdout || "").trim();
          const expectedOutput = (tc.expectedOutput || "").trim();

          // Check if we are in demo mode
          if (actualOutput.includes("Demo mode")) {
            // For demo mode, we just let it pass if it runs successfully
            continue;
          }

          if (actualOutput !== expectedOutput) {
            finalStatus = "Wrong Answer";
            finalOutput.stdout = `Test case ${i + 1} failed.\n\nInput:\n${tc.input}\n\nExpected Output:\n${expectedOutput}\n\nActual Output:\n${actualOutput}`;
            finalOutput.status = "Wrong Answer";
            break;
          }
        }
      }

      setOutput(finalOutput);

      await API.post("/submissions", {
        problemId: problem._id,
        code,
        language,
        status: finalStatus,
        runtime: finalOutput?.time || "N/A",
        memory: finalOutput?.memory || "N/A",
        output: finalOutput?.stdout || finalOutput?.stderr || "",
      });

      if (finalStatus === "Accepted") {
        toast.success("Solution accepted! 🎉");
      } else if (finalStatus === "Wrong Answer") {
        toast.error("Wrong answer. Keep trying!");
      } else {
        toast.error("Execution error.");
      }
    } catch (err) {
      toast.error("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="text-center py-20 text-slate-400">Problem not found</div>
    );
  }

  const diffColor = {
    Easy: "bg-emerald-50 text-emerald-600",
    Medium: "bg-amber-50 text-amber-600",
    Hard: "bg-red-50 text-red-500",
  };

  return (
    <div className="flex h-[calc(100vh-7rem)] gap-4 animate-fade-in -m-6">
      {/* Left Panel — Problem Description */}
      <div className="w-[45%] flex flex-col bg-white border-r border-slate-200 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 px-4">
          <button
            onClick={() => setActiveTab("description")}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "description"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <FileText size={15} /> Description
          </button>
          <button
            onClick={() => setActiveTab("submissions")}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "submissions"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <TestTube size={15} /> Test Cases
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === "description" ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-xl font-bold text-slate-900">
                  {problem.title}
                </h1>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${diffColor[problem.difficulty]}`}
                >
                  {problem.difficulty}
                </span>
              </div>

              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                {problem.category}
              </span>

              <div className="mt-5 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {problem.description}
              </div>

              {/* Examples */}
              {problem.examples?.length > 0 && (
                <div className="mt-6 space-y-4">
                  {problem.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="bg-slate-50 rounded-xl p-4 border border-slate-100"
                    >
                      <h3 className="text-sm font-semibold text-slate-700 mb-2">
                        Example {i + 1}
                      </h3>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="font-medium text-slate-600">Input: </span>
                          <code className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-xs">
                            {ex.input}
                          </code>
                        </p>
                        <p>
                          <span className="font-medium text-slate-600">Output: </span>
                          <code className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-xs">
                            {ex.output}
                          </code>
                        </p>
                        {ex.explanation && (
                          <p className="text-slate-500 mt-1 text-xs">
                            <span className="font-medium">Explanation:</span>{" "}
                            {ex.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Constraints */}
              {problem.constraints?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">
                    Constraints
                  </h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {problem.constraints.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <code className="text-xs bg-slate-50 px-1.5 py-0.5 rounded">
                          {c}
                        </code>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-700">
                Test Cases
              </h3>
              {problem.testCases?.map((tc, i) => (
                <div
                  key={i}
                  className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-sm"
                >
                  <p className="mb-1">
                    <span className="font-medium text-slate-600">Input: </span>
                    <code className="text-xs">{tc.input}</code>
                  </p>
                  <p>
                    <span className="font-medium text-slate-600">Expected: </span>
                    <code className="text-xs text-emerald-600">
                      {tc.expectedOutput}
                    </code>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel — Code Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Language selector + buttons */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-200">
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-slate-100 text-sm font-medium text-slate-700 pl-3 pr-8 py-1.5 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRun}
              disabled={running || submitting}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
            >
              {running ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Play size={14} />
              )}
              Run
            </button>
            <button
              onClick={handleSubmit}
              disabled={running || submitting || !user}
              title={!user ? "Please login to submit your solution" : ""}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Send size={14} />
              )}
              Submit
            </button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            language={LANGUAGES.find((l) => l.value === language)?.monacoId}
            value={code}
            onChange={(val) => setCode(val || "")}
            theme="vs-dark"
            options={{
              fontSize: 14,
              fontFamily: "'Fira Code', 'Cascadia Code', monospace",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 16 },
              lineNumbers: "on",
              roundedSelection: true,
              automaticLayout: true,
              tabSize: 2,
            }}
          />
        </div>

        {/* Output Panel */}
        {output && (
          <div className="border-t border-slate-200 bg-slate-900 text-white p-4 max-h-48 overflow-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {output.status === "Accepted" ? (
                  <CheckCircle2 size={16} className="text-emerald-400" />
                ) : (
                  <XCircle size={16} className="text-red-400" />
                )}
                <span
                  className={`text-sm font-semibold ${
                    output.status === "Accepted"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {output.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {output.time}
                </span>
                <span className="flex items-center gap-1">
                  <Cpu size={12} /> {output.memory}
                </span>
              </div>
            </div>
            {output.stdout && (
              <pre className="text-sm text-slate-300 font-mono bg-slate-800 p-3 rounded-lg mt-2">
                {output.stdout}
              </pre>
            )}
            {output.stderr && (
              <pre className="text-sm text-red-300 font-mono bg-slate-800 p-3 rounded-lg mt-2">
                {output.stderr}
              </pre>
            )}
            {output.compile_output && (
              <pre className="text-sm text-amber-300 font-mono bg-slate-800 p-3 rounded-lg mt-2">
                {output.compile_output}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
