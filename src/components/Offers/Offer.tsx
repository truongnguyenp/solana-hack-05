import React, { useState } from 'react';

import Pic from './product/Pic';
import TextOffer from './product/TextOffer';

import Profile from './profile/Profile';
import { useToggle } from 'usehooks-ts';
import BorrowingRequest from '../BorrowingRequest';
import ViewPrivateTransaction from '../ViewPrivateTransaction';
import ViewToken from '../ViewToken';
import { Button } from '@chakra-ui/react';
const Offer = ({ offer }: any) => {
  const [isBorrowingRequestodalVisible, toggleBorrowingRequestodalVisible] =
    useToggle();

  const [isViewTransactionModalVisible, toggleViewTransactionModalVisible] =
    useToggle();
  const [isViewTokenModalVisible, toggleViewTokenModalVisible] = useToggle();
  return (
    <div className="frame">
      <Profile userImg={offer.userImg} userName={offer.userName} />
      <Pic source={offer.nftCollectionImg} />
      <TextOffer
        title={offer.title}
        nftCollectionName={offer.nftCollectionName}
        currency={offer.currency}
        maximumLending={offer.maximumLending}
        interestRate={offer.interestRate}
      />

      <div className="flex flex-col gap-4">
        {/* <BorrowingRequest
          className="flex justify-center"
          isBorrowingRequestodalVisible={isBorrowingRequestodalVisible}
          toggleBorrowingRequestodalVisible={toggleBorrowingRequestodalVisible}
        /> */}
        {/* <ViewPrivateTransaction
          className="flex justify-center"
          isViewTransactionModalVisible={isViewTransactionModalVisible}
          toggleViewTransactionModalVisible={toggleViewTransactionModalVisible}
        /> */}
        <div className="flex justify-center">

        {!!offer.currency ? (
          <ViewToken
            isViewTokenModalVisible={isViewTokenModalVisible}
            toggleViewTokenModalVisible={toggleViewTokenModalVisible}
            loading={false}
          />
        ) : (
          <Button colorScheme="whatsapp" className="w-[200px]">
            Buy
          </Button>
        )}
        </div>
      </div>
    </div>
  );
};

export default Offer;
