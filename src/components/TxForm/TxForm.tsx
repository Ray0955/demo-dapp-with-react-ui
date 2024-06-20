import React, { useCallback, useState } from 'react';
import ReactJson, { InteractionProps } from 'react-json-view';
import './style.scss';
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

const defaultTx: SendTransactionRequest = {
  validUntil: Math.floor(Date.now() / 1000) + 600,
  messages: [
    {
      address: 'EQCKWpx7cNMpvmcN5ObM5lLUZHZRFKqYA4xmw9jOry0ZsF9M',
      amount: '5000000',
      stateInit: 'te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==',
      payload: 'te6ccsEBAQEADAAMABQAAAAASGVsbG8hCaTc/g==',
    },
  ],
};

export function TxForm() {
  const [tx, setTx] = useState(defaultTx);
  const wallet = useTonWallet();
  const [tonConnectUi] = useTonConnectUI();
  const [showWindow, setShowWindow] = useState(false);

  const onChange = useCallback((value: InteractionProps) => {
    setTx(value.updated_src as SendTransactionRequest);
  }, []);

  const handleWalletConnect = () => {
    tonConnectUi.openModal();
    setShowWindow(true);
  };

  const handleSendTransaction = () => {
    tonConnectUi.sendTransaction(tx);
  };

  return (
    <div className="send-tx-form">
      <h3>Настройка и отправка транзакции</h3>
      
      <ReactJson theme="ocean" src={defaultTx} onEdit={onChange} onAdd={onChange} onDelete={onChange} />

      {wallet ? (
        <button onClick={handleSendTransaction}>Отправить транзакцию</button>
      ) : (
        <button onClick={handleWalletConnect}>Подключить кошелек, чтобы отправить транзакцию</button>
      )}

      {showWindow && (
        <div className="window">
          <h2>Добро пожаловать в окно транзакции!</h2>
          <p>Вы успешно подключили свой кошелек.</p>
        </div>
      )}
    </div>
  );
}
