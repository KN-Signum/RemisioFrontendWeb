interface Props {
    tests: { name: string; value: string }[];
}

export const DiagnosticTestsGrid: React.FC<Props> = ({ tests }) => (
    <div className="bg-white w-[65%] p-4 rounded-sm shadow-md overflow-y-auto">
        <h2 className="text-lg font-bold text-primary mb-2">Testy diagnostyczne</h2>

        <div className="grid grid-cols-3 gap-2">
            {tests.map((test, idx) => (
                <div
                    key={idx}
                    className="bg-primary p-6 rounded-md shadow-sm flex justify-between"
                >
                    <span className="text-white text-xs line-clamp-1">{test.name}</span>
                    <span className="font-semibold text-white text-xs">{test.value}</span>
                </div>
            ))}
        </div>
    </div>
);
