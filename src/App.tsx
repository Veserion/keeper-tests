import React from 'react';
import {Button, notification} from 'antd';
import './App.css';
import {transactions} from "./transactions/transactions";

function App() {
    const auth = () => (window as any).WavesKeeper.publicState().then((resp: any) => notification.open({message: `Keeper version ${resp.version}`})).catch((e: any) => notification.error({message: 'Keeper is not installed'}))
    const sign = (tx: any) => (window as any).WavesKeeper.signAndPublishTransaction(tx).then((tx: any) => {
        notification.open({message: 'Sign tx', description: tx});
    }).catch((error: any) => {
        notification.error({message: 'Error!!!', description: JSON.stringify(error, null, 4)});
    });

    return (
        <div className="App">
            <header className="App-header">
                <Button type="primary" onClick={auth} style={{width: '150px', marginBottom: '20px'}}>Check
                    Keeper</Button>
                {transactions.map((tx, i) =>
                    <Button type="primary" onClick={() => sign(tx)} key={i} style={{width: '150px', marginBottom: '20px'}}>
                        {`Sign ${tx.type} type`}
                    </Button>)}
            </header>
        </div>
    );
}

export default App;
