import { Progress } from 'antd';
import React from 'react'
import { formatINR } from '../utils/formatINR';
const Analytics = ({ transaction }) => {
    console.log(transaction)
    const totalTransaction = transaction.length;
    const totalIncomeTransaction = transaction.filter(transaction => transaction.type === "income")
    const totalExpenseTransaction = transaction.filter(transaction => transaction.type === "expense")
    const totalIncomePercent = (totalIncomeTransaction.length / totalTransaction) * 100
    const totalExpensePercent = (totalExpenseTransaction.length / totalTransaction) * 100

    const totalTurnover = transaction.reduce((acc, transactionData) => acc + transactionData.amount, 0);
    const totalIncometurnover = transaction.filter(transaction => transaction.type === "income").reduce((acc, transactionData) => acc + transactionData.amount, 0)
    const totalExpenseturnover = transaction.filter(transaction => transaction.type === "expense").reduce((acc, transactionData) => acc + transactionData.amount, 0)


    const incomeTurnoverPercent = (totalIncometurnover / totalTurnover) * 100
    const expenseTurnoverPercent = (totalExpenseturnover / totalTurnover) * 100
    return (
        <div className='bg-gray-100/30 backdrop-blur-md  rounded-xl p-5 overflow-hidden '>
            <div className='flex  justify-around items-center px-5'>
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

        </div>
    )
}

export default Analytics