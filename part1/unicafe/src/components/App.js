import React, { useState } from 'react';

const StatisticLine = ({ text, value }) => {
    return <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
}

const Statistics = ({ stats }) => {
    if(stats.all > 0) {
        return (<table>
            <tbody>
                <StatisticLine text='good' value={stats.good}/>
                <StatisticLine text='neutral' value={stats.neutral}/>
                <StatisticLine text='bad' value={stats.bad}/>
                <StatisticLine text='all' value={stats.all}/>
                <StatisticLine text='average' value={stats.average}/>
                <StatisticLine text='positive' value={stats.positive}/>
            </tbody>
        </table>)
    }
    else{
        return <p>No feedback given</p>
    }
}

const Button = ({ reviewType, oldStat, handler }) => {
    return <button onClick={() => handler(oldStat+1)}>{reviewType}</button>
}
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    
    const all=good+neutral+bad;
    let average=0, positive=0;
    if(all !== 0)
    {
        average=((good*1+bad*(-1))/all).toFixed(1);
        positive = ((good*100)/all).toFixed(1) + ' %';
    }
    const stats = {
        good,
        neutral,
        bad,
        all,
        average,
        positive
    }
    return (
        <>
            <h1>give feedback</h1>
            <Button oldStat={good} reviewType='good' handler={setGood}/>
            <Button oldStat={neutral} reviewType='neutral' handler={setNeutral}/>
            <Button oldStat={bad} reviewType='bad' handler={setBad}/>
            <h1>statistics</h1>
            <Statistics stats={stats}/>
        </>
    );
};

export default App;
