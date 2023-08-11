import { PrivateTxWrapper, getSendTxWithViewingKey } from '@elusiv/sdk';
import React, { useContext, useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { GlobalIcon } from './icons';
import Modal from './common/Modal';
import { Button } from '@chakra-ui/react';
import { AppContext } from '@/contexts/AppProvider';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import TransactionItem from './TransactionItem';

interface ViewTokenProps {
  isViewTokenModalVisible: boolean;
  toggleViewTokenModalVisible: () => void;
  className?: string;
}

interface TransactionModal {
  owner: string;
  recipient: string;
  amount: number;
}

export default function ViewToken({
  isViewTokenModalVisible,
  toggleViewTokenModalVisible,
  className,
}: ViewTokenProps) {
  const {
    wallet: { elusiv },
  } = useContext(AppContext);

  return (
    <div className={className}>
      <Button
        leftIcon={<GlobalIcon />}
        colorScheme="purple"
        onClick={async () => {
          toggleViewTokenModalVisible();
        }}
        className="w-[200px]"
      >
        View Token
      </Button>

      <Modal
        isOpen={isViewTokenModalVisible}
        onClose={toggleViewTokenModalVisible}
        modalLabel="View Private Token on Elusiv"
        onSubmit={() => {}}
      >
        {<img src="./chart.png" />}
        <div className="flex justify-between">
        <Button colorScheme="whatsapp" className="w-[120px]">
          Buy
        </Button>
        <Button  colorScheme='red' className="w-[120px]">Sell</Button>
          </div>
        
      </Modal>
    </div>
  );
}
