import React from 'react';
interface AnalysisDetailsLogProps {
  logs: string[];
}
export const AnalysisDetailsLog: React.FC<AnalysisDetailsLogProps> = ({
  logs
}) => {
  return <div className="bg-[#F8F9FA] rounded-lg p-3 max-h-32 overflow-y-auto">
      <pre className="text-xs font-mono text-[#616161] whitespace-pre-wrap">
        {logs.length > 0 ? logs.map((log, index) => <div key={index} className="mb-1">
              {log}
            </div>) : <div className="text-center py-2 text-gray-400">
            No logs available
          </div>}
      </pre>
    </div>;
};