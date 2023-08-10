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
import CreatePost from './CreatePost';

export default function StakingNFT({
  isAuditingRequestodalVisible,
  toggleAuditingRequestodalVisible,
  loading = false
}: {
  isAuditingRequestodalVisible: boolean;
  toggleAuditingRequestodalVisible: () => void;
  setTransaction: (obj: any) => void;
}) {
  return (
    <div>
      <Button
        isLoading={loading}
        leftIcon={<TopUpIcon />}
        colorScheme="purple"
        onClick={() => {
          toggleAuditingRequestodalVisible();
        }}
        className="w-[200px]"
      >
        Auditing request
      </Button>
      <Modal
        isOpen={isAuditingRequestodalVisible}
        onClose={toggleAuditingRequestodalVisible}
        modalLabel="Auditing Requests"
        onSubmit={() => {}}
      >
        <CreatePost />
      </Modal>
    </div>
  );
}
