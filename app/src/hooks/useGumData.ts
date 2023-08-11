import { PostMetadata } from "@/types";
import { useExploreFeed, useGumContext } from "@gumhq/react-sdk";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";


export const useGumData = () => {

  const { sdk } = useGumContext();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { exploreFeedData, exploreFeedLoading } = useExploreFeed(
    sdk,
    'Personal'
  );
  console.log('exploreFeedData', exploreFeedData);
  useEffect(() => {
    const getData = async () => {
      if (exploreFeedData) {
        await testGetData(exploreFeedData);
      }
    };
    getData();
  }, [exploreFeedData]);

  const testGetData = async (data: any) => {
    setLoading(true);
    const filteredData = data.filter(
      (post: any) =>
        post.metadata.platform === 'STAKINGLENDING' &&
        post.metadata.content.publicKey
    );
    const promises = filteredData.map(async (post: any) => {
      const profileMeta = await sdk.profileMetadata.getProfileMetadataByUser(
        new PublicKey(post.metadata.content.publicKey)
      );
      const profileData = profileMeta[0].metadata;
      const { type, content } = post.metadata;
      return {
        post: {
          type,
          content,
        } as PostMetadata,
        profile: profileData,
        address: post.address,
      };
    });

    const feedsData = await Promise.all(promises);
    setData(feedsData);
    setLoading(false);
  };
  return {
    data, loading
  }
}
