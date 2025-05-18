import Chart from "react-apexcharts";

interface Props {
    weeks: string[];
    scores: number[];
}

export const ScoreTimelineChart: React.FC<Props> = ({ weeks, scores }) => (
    <Chart
        type="line"
        height="100%"
        width="100%"
        series={[{ name: "Score (%)", data: scores }]}
        options={{
            chart: { id: "score-chart", toolbar: { show: false }, zoom: { enabled: false } },
            stroke: { curve: "smooth", width: 2 },
            markers: { size: 4 },
            colors: ["#6b46c1"],
            xaxis: { categories: weeks, labels: { rotate: -45 }, type: "datetime" },
            yaxis: {
                min: 0,
                max: 100,
                tickAmount: 5,
                labels: { formatter: (v: number) => `${v}%` },
                title: { text: "Score (%)" },
            },
            tooltip: { y: { formatter: (v: number) => `${v}%` } },
            grid: { strokeDashArray: 4 },
            legend: { show: false },
            responsive: [{ breakpoint: 640, options: { xaxis: { labels: { rotate: -90 } } } }],
        }}
    />
);
