import React from 'react';

interface Prop {
  name: string;
  type: string;
  description: string;
}

interface PropsTableProps {
  propsData: Prop[];
}

const PropsTable: React.FC<PropsTableProps> = ({ propsData }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-black border-collapse border-zinc-800 shadow-lg rounded-lg">
        {/* Table Header */}
        <thead>
          <tr className="bg-zinc-900">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider border-l border-t border-zinc-800">Prop Name</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider border-l border-t border-zinc-800">Type</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider border-l border-t border-zinc-800 border-r">Description</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {propsData.map((prop, index) => (
            <tr key={index} className="bg-black">
              <td className="px-6 py-4 text-sm text-gray-300 border-l border-zinc-800 border-b">{prop.name}</td>
              <td className="px-6 py-4 text-sm text-gray-300 border-l border-zinc-800 border-b">{prop.type}</td>
              <td className="px-6 py-4 text-sm text-gray-400 border-l border-zinc-800 border-b border-r">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropsTable;
