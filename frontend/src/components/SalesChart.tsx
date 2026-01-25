import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    type TooltipIndex,
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';

// #region Sample data
const data = [
    {
        name: 'Jan',
        uv: 4000,
        sales: 2400,
        amt: 2400,
    },
    {
        name: 'Feb',
        uv: 3000,
        sales: 1398,
        amt: 2210,
    },
    {
        name: 'March',
        uv: 2000,
        sales: 9800,
        amt: 2290,
    },
    {
        name: 'April',
        uv: 2780,
        sales: 3908,
        amt: 2000,
    },
    {
        name: 'May',
        uv: 1890,
        sales: 4800,
        amt: 2181,
    },
    {
        name: 'June',
        uv: 2390,
        sales: 3800,
        amt: 2500,
    },
    {
        name: 'July',
        uv: 3490,
        sales: 4300,
        amt: 2100,
    },
    {
        name: 'Aug',
        uv: 3490,
        sales: 4300,
        amt: 2100,
    },
    {
        name: 'Sep',
        uv: 3490,
        sales: 4300,
        amt: 2100,
    },
    {
        name: 'Oct',
        uv: 3490,
        sales: 4300,
        amt: 2100,
    },
    {
        name: 'Nov',
        uv: 3490,
        sales: 4300,
        amt: 2100,
    },
    {
        name: 'Dec',
        uv: 3490,
        sales: 4300,
        amt: 2100,
    },
];


export const SalesChart = ({
    isAnimationActive = true,
    defaultIndex,
}: {
    isAnimationActive?: boolean;
    defaultIndex?: TooltipIndex;
}) => {
    return (
        <BarChart
            style={{ width: '100%', maxWidth: '600px', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={data}
            margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 0,
            }}
        >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            <YAxis width="auto" />
            <Tooltip content={CustomTooltip} isAnimationActive={isAnimationActive} defaultIndex={defaultIndex} />
            <Legend />
            <Bar dataKey="sales" barSize={20} fill="#ffb900" isAnimationActive={isAnimationActive} />
        </BarChart>
    );
};