import React, { useContext, useState } from 'react';
import {
  Button,
  FormControl,
  Input,
  useToast,
  FormLabel,
} from '@chakra-ui/react';
import { TopUpIcon } from './icons';
import Modal from './common/Modal';
import { TopupTxData } from '@elusiv/sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { AppContext } from '@/contexts/AppProvider';

export default function Topup({
  isTopUpModalVisible,
  toggleTopUpModalVisible,
}: {
  isTopUpModalVisible: boolean;
  toggleTopUpModalVisible: () => void;
  setTransaction: (obj: any) => void;
}) {
  return (
    <div>
      <Button
        isLoading={loading}
        leftIcon={<TopUpIcon />}
        colorScheme="purple"
        onClick={toggleTopUpModalVisible}
        className="w-[200px]"
      >
        Topup
      </Button>
      <Modal
        loading={loading}
        isOpen={isTopUpModalVisible}
        actionLabel="Topup"
        onClose={toggleTopUpModalVisible}
        modalLabel="Topup to Elusiv"
        onSubmit={() => {}}
      >
        <FormControl isRequired>
          <FormLabel>Amount (SOL)</FormLabel>
          <Input value={amount} onChange={handleInputChange}></Input>
        </FormControl>
      </Modal>
    </div>
  );
}
