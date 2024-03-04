import { useState } from 'react';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { abi } from '../contracts/SmartBet.json';


const SmartBet = () => {
    const contractAddress = '0xDd7c4dDa1BdE723fee655eE1DE5555B6dAF0BBf8';
    const signer = useSigner();
    const provider = useProvider();
    const SmartBetContract = new ethers.Contract(contractAddress, abi, provider);

    const [ani, setAni] = useState<'animate-coin' | ''>('');

    const [selected, setSelected] = useState('');
    const [bet, setBet] = useState('');


    const handleClick = (event: any) => {
        setSelected(event.target.value);
    };

    const handleChange = (event: any) => {
        setBet(event.target.value);
    };

    const handleFlip = async () => {
        try {
            if (!bet) {
                alert('Please enter a bet amount first!');
                return;
            }

            if (selected === '') {
                alert('Please select PSG or OM first!');
                return;
            }

            // Bet amount in Ether
            const betAmount = ethers.utils.parseEther(bet);

            let betOutcome = false // Heads by default;

            // Chosen outcome: Outcome.Heads (1) or Outcome.Tails (0)
            if (selected === 'PSG') {
                betOutcome = false;
            }
            else if (selected === 'OM') {
                betOutcome = true;
            }
            if(signer.data != null){
                // Call the flip function with the provided bet amount and outcome
                const tx = await SmartBetContract.connect(signer.data).placeBet(betOutcome, { value: betAmount });

                console.log(tx);

                await tx.wait();

                setAni('animate-coin');
                setTimeout(() => {
                    setAni('');
                }, 1000);
            }
        } catch (err) {
            console.log(err);
        }
    };


    // TODO: Add a random number generator to determine heads or tails based on the smart contract
    const result = <p className="inline text-xl font-bold">{Math.random() < 0.5 ? 'PSG' : 'OM'}</p>

    return (
        <>
            <ConnectButton />
            <div className='mt-4 mb-4'>
                <div className={'coin ' + ani}>{result}</div>
            </div>

            {selected ? (
                    <div>
                        <p className="text-xl flex flex-row items-center justify-center font-bold mx-auto">You chose: {selected}</p>
                        <div className='mt-4 mb-4 flex flex-row items-center justify-center
            bg-transparent hover:bg-red-500 text-white-700
            font-semibold hover:text-white py-2 px-4 border
            border-red-500 hover:border-transparent
            rounded' onClick={() => setSelected("")}>Reset choice ?</div>
                    </div>
                ) :
                ("") }

            <div className='mt-4 mb-4'>
                <div className="flex flex-row items-center justify-center ">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleClick} value="PSG">PSG</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleClick} value="OM">OM</button>
                </div>
            </div>
            <div>
                <div className="relative">
                    <input
                        type="number"
                        placeholder="Enter your bet"
                        value={bet}
                        id="bet-input"
                        onChange={handleChange}
                        className="px-3 py-3 placeholder-slate-300
                    text-slate-600 relative bg-white bg-white
                    rounded text-sm border border-slate-300 outline-none
                    focus:outline-none focus:ring w-full
                    "
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3" style={{ pointerEvents: 'none' }}>
                <Image
                    src="/static/ethereum-eth-icon.webp"
                    alt="ETH icon"
                    width={25}
                    height={25}
                />
                </span>
                </div>
            </div>

            <span>
            <div className='mt-4 mb-4' onClick={handleFlip}>

            </div>
        </span>

            <div className="flex mt-4 mb-4 flex-col items-center justify-center items-center">
                <p className="bg-blue-500 hover:bg-blue-700
            text-white font-bold py-2 px-4 rounded-full
            mt-4">
                    Contract : <a target="blank_" href='https://sepolia.etherscan.io/address/0xDd7c4dDa1BdE723fee655eE1DE5555B6dAF0BBf8'>0xDd7c4dDa1BdE723fee655eE1DE5555B6dAF0BBf8
                </a>
                </p>
            </div>
        </>

    );
};

export default SmartBet;



