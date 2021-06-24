import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import Token from './artifacts/contracts/Token.sol/Token.json'

const tokenAddress = "0x934c09b2990Efe124371549a6d4Aea8EB71108fe"

function App() {

  const [balance, setBalance] = useState(0)
  const [transferValue, setTransferValue] = useState(0)
  const [transferAddress, setTransferAddress] = useState("")

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress()

      try {
        const data = await contract.balanceOf(userAddress)
        console.log('data: ', data)
        setBalance(data.toString())
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  function handleValueChange(event) {
    setTransferValue(event.target.value);
  }
  function handleAddressChange(event) {
    setTransferAddress(event.target.value);
  }

  async function transferTokens(){

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress()

    try {
      console.log(transferValue)
      console.log(transferAddress)
      const data = await contract.connect(signer).transfer(transferAddress, transferValue)
      console.log('data: ', data)
    } catch (err) {
      console.log("Error: ", err)
    }
    //0xE2163BE5e23Bd58713430E59c0702BA16E44A84A
    await fetchBalance()

  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test Token</h1>
        <h3>Send some Test Token</h3>
        <p>Amount: <input type="number" name="transferValue" onChange={handleValueChange}/></p>
        <p>To address: <input type="text" name="transferAddress" onChange={handleAddressChange}/></p>
        <button onClick={transferTokens}>Send</button>
        <button onClick={fetchBalance}>Update Balance</button>
        <h3>Your Test Token</h3>
        <p>Your balance: {balance}</p>
      </header>
    </div>
  );
}

export default App;
