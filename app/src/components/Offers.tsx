import { useGumData } from '@/hooks/useGumData';
import Offer from './Offers/Offer';

import { OFFERS } from '@/constants';

const Offers = () => {
  const { data, loading } = useGumData();
  console.log(data);
  return (
    <>
      {OFFERS.map((offer: any) => (
        <Offer key={offer.id} offer={offer} />
      ))}
    </>
  );
};

export default Offers;
