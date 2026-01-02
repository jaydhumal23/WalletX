import { Progress } from 'antd';
import React from 'react';
import { formatINR } from '../utils/formatINR'; // Assuming this path exists

const Analytics = ({ transaction }) => {
    // 1. Data Processing
    const categories = ["salary", "tip", "project", "food", "movie", "bills", "medical", "fee", "tax"];

    const totalTransaction = transaction.length;
    const totalIncomeTransactions = transaction.filter(t => t.type === "income");
    const totalExpenseTransactions = transaction.filter(t => t.type === "expense");

    const totalIncomeTurnover = transaction
        .filter(t => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpenseTurnover = transaction
        .filter(t => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

    // Net Balance calculation
    const totalNetBalance = totalIncomeTurnover - totalExpenseTurnover;

    // Percentage for the top overview bar (Income vs Expense ratio)
    const totalTurnover = totalIncomeTurnover + totalExpenseTurnover;
    const incomeRatio = totalTurnover > 0 ? (totalIncomeTurnover / totalTurnover) * 100 : 0;
    const expenseRatio = totalTurnover > 0 ? (totalExpenseTurnover / totalTurnover) * 100 : 0;

    return (
        <div className='p-4 md:p-6 select-none'>
            {/* --- SECTION 1: OVERVIEW CARDS --- */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>

                {/* Card 1: Net Balance (The most important number) */}
                <div className='bg-gray-100/60 p-6 rounded-2xl shadow-xl  flex flex-col justify-between h-40'>
                    <div>
                        <h2 className='text-gray-500 font-medium'>Net Balance</h2>
                        <h1 className={`text-3xl font-bold mt-2 ${totalNetBalance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {formatINR(totalNetBalance)}
                        </h1>
                    </div>
                    <div className='text-xs text-gray-400'>
                        Total Transactions: {totalTransaction}
                    </div>
                </div>

                {/* Card 2: Income Details */}
                <div className='bg-gray-100/60 p-6 rounded-2xl shadow-xl  flex flex-col justify-between h-40 backdrop-blur-xl'>
                    <div>
                        <h2 className='text-gray-500 font-medium'>Total Income</h2>
                        <h1 className='text-3xl font-bold text-green-600 mt-2'>{formatINR(totalIncomeTurnover)}</h1>
                    </div>
                    <div className='w-full'>
                        <p className='text-xs text-gray-400 mb-1'>{totalIncomeTransactions.length} Transactions</p>
                        <Progress percent={incomeRatio} showInfo={false} strokeColor="green" size="small" />
                    </div>
                </div>

                {/* Card 3: Expense Details */}
                <div className='bg-gray-100/60 p-6 rounded-2xl shadow-xl  flex flex-col justify-between h-40'>
                    <div>
                        <h2 className='text-gray-500 font-medium'>Total Expense</h2>
                        <h1 className='text-3xl font-bold text-red-500 mt-2'>{formatINR(totalExpenseTurnover)}</h1>
                    </div>
                    <div className='w-full'>
                        <p className='text-xs text-gray-400 mb-1'>{totalExpenseTransactions.length} Transactions</p>
                        <Progress percent={expenseRatio} showInfo={false} strokeColor="red" size="small" />
                    </div>
                </div>
            </div>

            {/* --- SECTION 2: CATEGORY BREAKDOWNS --- */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                {/* Income Breakdown */}
                <div className='bg-gray-100/60 p-6 rounded-2xl shadow-xl '>
                    <h2 className='text-lg font-bold text-gray-700 mb-4'>Income Sources</h2>
                    <div className='flex flex-col gap-4'>
                        {categories.map((category) => {
                            const amount = transaction
                                .filter(t => t.type === "income" && t.category === category)
                                .reduce((acc, t) => acc + Number(t.amount), 0);

                            // FIX: Calculate % relative to Total Income, not Turnover
                            const percent = totalIncomeTurnover > 0 ? (amount / totalIncomeTurnover) * 100 : 0;

                            return amount > 0 && (
                                <div key={category} className='w-full'>
                                    <div className='flex justify-between items-center mb-1'>
                                        <span className='capitalize text-gray-600 text-sm font-medium'>{category}</span>
                                        <span className='text-gray-500 text-sm'>{percent.toFixed(0)}%</span>
                                    </div>
                                    <Progress percent={percent} showInfo={false} strokeColor="green" />
                                </div>
                            );
                        })}
                        {totalIncomeTurnover === 0 && <p className='text-gray-400 text-sm text-center py-4'>No Data</p>}
                    </div>
                </div>

                {/* Expense Breakdown */}
                <div className='bg-gray-100/60 p-6 rounded-2xl shadow-xl '>
                    <h2 className='text-lg font-bold text-gray-700 mb-4'>Expense Breakdown</h2>
                    <div className='flex flex-col gap-4'>
                        {categories.map((category) => {
                            const amount = transaction
                                .filter(t => t.type === "expense" && t.category === category)
                                .reduce((acc, t) => acc + Number(t.amount), 0);

                            // FIX: Calculate % relative to Total Expense
                            const percent = totalExpenseTurnover > 0 ? (amount / totalExpenseTurnover) * 100 : 0;

                            return amount > 0 && (
                                <div key={category} className='w-full'>
                                    <div className='flex justify-between items-center mb-1'>
                                        <span className='capitalize text-gray-600 text-sm font-medium'>{category}</span>
                                        <span className='text-gray-500 text-sm'>{percent.toFixed(0)}%</span>
                                    </div>
                                    <Progress percent={percent} showInfo={false} strokeColor="red" />
                                </div>
                            );
                        })}
                        {totalExpenseTurnover === 0 && <p className='text-gray-400 text-sm text-center py-4'>No Data</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;