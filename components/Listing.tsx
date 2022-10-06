import { useContract } from "@thirdweb-dev/react";
import { AuctionListing, DirectListing, Marketplace } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import React from "react";

interface Props {
  listing: DirectListing | AuctionListing;
}

export default function Listing({ listing }: Props) {
  const { contract: marketplace, isLoading } = useContract<Marketplace>(
    "0x4639549f85b7E9092a7E962b6752018C210a6c31"
  );

  const purchase = async () => {
    try {
      if (isLoading) return;
      await marketplace?.buyoutListing(listing.id, 1);
      alert("Purchase successful!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed!");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div>
        <img
          src={listing.asset.image!}
          style={{ height: "200px", width: "200px" }}
        />
      </div>
      <div>{listing.asset.name!}</div>
      <div>{listing.assetContractAddress}</div>
      <div>Token ID: {listing.tokenId.toString()}</div>
      <div>{ethers.utils.formatEther(listing.buyoutPrice)} MATIC</div>
      <button onClick={purchase}>Purchase</button>
    </div>
  );
}
