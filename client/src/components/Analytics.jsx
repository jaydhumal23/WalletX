import { Progress } from 'antd';
import React from 'react'
import { formatINR } from '../utils/formatINR';
const Analytics = ({ transaction }) => {
    const categories = ["salary", "tip", "project", "food", "movie", "bills", "medical", "fee", "tax"]

    const totalTransaction = transaction.length;
    const totalIncomeTransaction = transaction.filter(transaction => transaction.type === "income")
    const totalExpenseTransaction = transaction.filter(transaction => transaction.type === "expense")

    const totalIncomePercent = totalTransaction > 0 ? (totalIncomeTransaction.length / totalTransaction) * 100 : 0;
    const totalExpensePercent = totalTransaction > 0 ? (totalExpenseTransaction.length / totalTransaction) * 100 : 0;

    const totalTurnover = transaction.reduce((acc, transactionData) => acc + transactionData.amount, 0);
    const totalIncometurnover = transaction.filter(transaction => transaction.type === "income").reduce((acc, transactionData) => acc + transactionData.amount, 0)
    const totalExpenseturnover = transaction.filter(transaction => transaction.type === "expense").reduce((acc, transactionData) => acc + transactionData.amount, 0)

    const incomeTurnoverPercent = totalTurnover > 0 ? (totalIncometurnover / totalTurnover) * 100 : 0;
    const expenseTurnoverPercent = totalTurnover > 0 ? (totalExpenseturnover / totalTurnover) * 100 : 0;


    const hasIncome = transaction.some(t => (t.type || "").toString().trim().toLowerCase() === "income");
    const hasExpense = transaction.some(t => (t.type || "").toString().trim().toLowerCase() === "expense");
    return (
        <div className='bg-gray-100/30 backdrop-blur-md  rounded-xl p-5 overflow-hidden '>
            <div className='flex flex-col gap-20'>
                <div className='hero1 flex  justify-around items-center px-5'>
                    <div className="card1">
                        <div className='bg-gray-50/40 backdrop-blur-3xl w-fit min-h-120 rounded-xl '>
                            <div className='p-5 '>
                                <h1 className='text-mono text-2xl mb-2 font-bold  text-gray-500'>Total Transactions : {totalTransaction}</h1>
                                <hr />
                                <br />
                                <h2 className='font-mono text-xl text-blue-500 font-semibold '>Income<span className='text-gray-500'>  &nbsp;: {totalIncomeTransaction.length}</span></h2>
                                <h2 className='font-mono text-xl text-red-500 font-semibold'>Expense<span className='text-gray-500'> : {totalExpenseTransaction.length}</span></h2>
                                <div className='mt-5   flex items-center gap-2'>
                                    <Progress strokeLinecap="butt" type='circle' strokeColor={"blue"} size={250} percent={totalIncomePercent.toFixed(0)} />
                                    <Progress strokeLinecap="butt" type='circle' strokeColor={"red"} size={250} percent={totalExpensePercent.toFixed(0)} />
                                </div>


                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div className="card2 ">
                        <div className='bg-gray-50/40 backdrop-blur-3xl  w-fit min-h-120 rounded-xl  '>
                            <div className='p-5 '>
                                <h1 className='text-mono text-2xl mb-2 font-bold  text-gray-500'>Total TurnOver: {formatINR(totalTurnover)} </h1>
                                <hr />
                                <br />
                                <h2 className='font-mono text-xl text-blue-500 font-semibold '>Income<span className='text-gray-500'> &nbsp;: {formatINR(totalIncometurnover)} </span></h2>
                                <h2 className='font-mono text-xl text-red-500 font-semibold'>Expense<span className='text-gray-500'> : {formatINR(totalExpenseturnover)} </span></h2>
                                <div className='mt-5   flex items-center gap-2 '>
                                    <Progress strokeLinecap="butt" type='circle' strokeColor={"blue"} size={250} percent={incomeTurnoverPercent.toFixed(0)} />
                                    <Progress strokeLinecap="butt" type='circle' strokeColor={"red"} size={250} percent={expenseTurnoverPercent.toFixed(0)} />
                                </div>


                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='hero2 flex  justify-around items-center px-5'>
                    {hasIncome && (<div className="card3">
                        <div className='bg-gray-50/40 backdrop-blur-3xl w-fit min-h-120 rounded-xl '>
                            <div className='p-5 '>
                                <h1 className='text-mono text-2xl mb-2 font-bold  text-gray-500'>Categories : Income </h1>
                                <hr />
                                <br />

                                <div className='mt-5   flex flex-col  gap-2'>
                                    {categories.map((category) => {
                                        const amount = transaction.filter((transactionData) => transactionData.type === "income" && transactionData.category === category).reduce((acc, transactionData) => acc + Number(transactionData.amount), 0);
                                        return (
                                            amount > 0 && (
                                                <div className='mb-2 bg-gray-200 rounded-md px-2 py-1'>
                                                    <h2 className='text-black mb-2 '>{category}</h2>
                                                    <Progress percent={((amount / totalTurnover) * 100).toFixed(0)} size={[600, 10]} />
                                                </div>
                                            )

                                        )
                                    })}
                                </div>


                            </div>
                            <div>

                            </div>
                        </div>
                    </div>)}

                    {hasExpense && (<div className="card4 ">
                        <div className='bg-gray-50/40 backdrop-blur-3xl  w-fit min-h-120 rounded-xl  '>
                            <div className='p-5 '>
                                <h1 className='text-mono text-2xl mb-2 font-bold  text-gray-500'>Categories : Expense </h1>
                                <hr />
                                <br />


                                <div className='mt-5   flex flex-col  gap-2 '>
                                    {categories.map((category) => {
                                        const amount = transaction.filter((transactionData) => transactionData.type === "expense" && transactionData.category === category).reduce((acc, transactionData) => acc + Number(transactionData.amount), 0);
                                        return (
                                            amount > 0 && (
                                                <div className='mb-2 bg-gray-200 rounded-md px-2 py-1'>
                                                    <h2 className='text-black mb-2 '>{category}</h2>
                                                    <Progress percent={((amount / totalTurnover) * 100).toFixed(0)} size={[600, 10]} />
                                                </div>
                                            )

                                        )
                                    })}
                                </div>


                            </div>
                            <div>

                            </div>
                        </div>
                    </div>)}

                </div>
            </div>

        </div>
    )
}

export default Analytics