import { getProfileAccount, getUserAccount } from '@/utils';
import {
  useCreatePost,
  useGumContext,
  useSessionWallet,
  useUploaderContext,
} from '@gumhq/react-sdk';
import { GPLCORE_PROGRAMS } from '@gumhq/sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
export type Post = {
  content: {
    content: string;
    format: string;
  };
  type: string;
  authorship: {
    signature: string;
    publicKey: string;
  };
  metadataUri: string;
  transactionUrl: string;
};

const CreatePost = () => {
  const [nameCampaign, setNameCampaign] = useState('');
  const [descriptionCampaign, setDescriptionCampaign] = useState('');
  const [imageUrlCampaign, setImageUrlCampaign] = useState('');
  const { sdk } = useGumContext();
  const wallet = useWallet();
  const session = useSessionWallet();
  const {
    publicKey,
    sessionToken,
    createSession,
    ownerPublicKey,
    sendTransaction,
  } = session;
  const { handleUpload, uploading, error } = useUploaderContext();
  const { create, createPostError } = useCreatePost(sdk);
  const [user, setUser] = useState<PublicKey | undefined>(undefined);
  const [profile, setProfile] = useState<PublicKey | undefined>(undefined);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const setUp = async () => {
      if (wallet.publicKey) {
        const userAccount = await getUserAccount(sdk, wallet.publicKey);
        if (userAccount) {
          setUser(userAccount);
          const profileAccount = await getProfileAccount(sdk, userAccount);
          if (profileAccount) {
            setProfile(profileAccount);
          } else {
            router.push('/createProfile');
          }
        } else {
          router.push('/createProfile');
        }
      }
    };
    setUp();
  }, [router, sdk, wallet.publicKey]);

  const updateSession = async () => {
    if (!sessionToken) {
      const targetProgramId = GPLCORE_PROGRAMS['devnet'];
      const topUp = true; // this will transfer 0.01 SOL to the session wallet
      const sessionDuration = 60;
      return await createSession(targetProgramId, topUp, sessionDuration);
    }
    return session;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const session = await updateSession();

    if (!session) {
      console.log('missing session');
      toast({
        title: 'missing session',
        description: 'missing session',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (
      !session.sessionToken ||
      !session.publicKey ||
      !session.signMessage ||
      !session.sendTransaction ||
      !profile ||
      !user
    ) {
      console.log(` profile: ${profile} user: ${user}`);
      console.log('missing session or profile or user');
      toast({
        title: 'missing session or profile or user',
        description: 'missing session or profile or user',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    // sign the post with the session wallet
    const nameCampaignArray = new TextEncoder().encode(nameCampaign);
    const signature = await session.signMessage(nameCampaignArray);
    const signatureString = JSON.stringify(signature.toString());

    const campaignMetadata = {
      content: {
        nameCampaign,
        descriptionCampaign,
        imageUrlCampaign,
        format: 'markdown',
      },
      type: 'text',
      authorship: {
        publicKey: session.publicKey.toBase58(),
        signature: signatureString,
      },
      metadataUri: '',
      transactionUrl: '',
    };

    // upload the post to arweave
    const uploader = await handleUpload(campaignMetadata, session);
    if (!uploader) {
      console.log('error uploading post');
      toast({
        title: 'Error Uploading Campaign Metadata',
        description: 'Have something wrong when upload metadauri',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    // create the post
    const txRes = await create(
      uploader.url,
      profile,
      user,
      session.publicKey,
      new PublicKey(session.sessionToken),
      session.sendTransaction
    ).catch((error) => console.log(error));
    if (!txRes) {
      console.log('error creating post');
      console.log(createPostError);
      toast({
        title: 'Create Campaign Error',
        description: 'Have something wrong when create Campaign',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    toast({
      title: 'Create Success Campaign',
      description:
        'Your Campaign is created now We will review your campaign :> ',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  return (
    <>
      <div className="w-3/4 mb-12 bg-gray-100 p-4 rounded-lg">
        <div className="">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              value={'nft'}
              onChange={(e) => setPost(e.target.value)}
              placeholder="What's on your mind?"
              className="px-7 py-2 border-[1px] border-gray-500 rounded-lg w-full mb-4"
            />
            <input
              type="text"
              value={'nft'}
              onChange={(e) => setPost(e.target.value)}
              placeholder="Image"
              className="px-7 py-2 border-[1px] border-gray-500 rounded-lg w-full mb-4"
            />
            <div className="mb-4">
              <label
                htmlFor="image"
                className="cursor-pointer px-3 py-2 bg-slate-300 rounded-md my-2 inline-block"
              >
                Upload Image
              </label>
              <input type="file" hidden id="image" />
            </div>

            <button type="submit" className="button bg-[#0072f5] text-white ">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
