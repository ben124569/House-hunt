"use client";

import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  property: {
    id: string;
    address: string;
    listingPrice: number;
    estimatedPrice?: number;
    bedrooms: number;
    bathrooms: number;
    carSpaces: number;
    landSize?: number;
    status: string;
    risks?: string[];
    images?: string[];
    suburb?: { name: string };
  };
}

export function PropertyCard({
  property,
}: PropertyCardProps) {
  const {
    id,
    address,
    listingPrice,
    estimatedPrice,
    bedrooms,
    bathrooms,
    carSpaces,
    landSize,
    status,
    images = [],
    suburb,
  } = property;
  
  const risks = property.risks || [];
  const suburbName = suburb?.name || 'Unknown Suburb';
  const statusClasses: Record<string, string> = {
    RESEARCHING: "bg-blue-100 text-blue-800",
    INTERESTED: "bg-green-100 text-green-800",
    VIEWING_SCHEDULED: "bg-yellow-100 text-yellow-800",
    VIEWED: "bg-purple-100 text-purple-800",
    OFFER_PENDING: "bg-orange-100 text-orange-800",
    REJECTED: "bg-red-100 text-red-800",
    PURCHASED: "bg-gray-100 text-gray-800",
    ARCHIVED: "bg-gray-100 text-gray-800"
  };

  const priceDifference = estimatedPrice ? listingPrice - estimatedPrice : null;
  const isOverpriced = priceDifference && priceDifference > 20000;
  const isGoodValue = priceDifference && priceDifference < -10000;

  return (
    <Link href={`/properties/${id}`}>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-shadow cursor-pointer">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Property Image */}
          <div className="w-full sm:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            {images.length > 0 && images[0] ? (
              <Image
                src={images[0]}
                alt={address}
                width={192}
                height={128}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="text-2xl mb-1">🏠</div>
                  <div className="text-xs">No Image</div>
                </div>
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{address}</h3>
                <p className="text-sm text-gray-600">{suburbName}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
                {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1).toLowerCase()}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{bedrooms} bed</span>
              <span>{bathrooms} bath</span>
              <span>{carSpaces} car</span>
              {landSize && <span>{landSize}m²</span>}
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-lg font-semibold text-gray-900">
                  ${listingPrice.toLocaleString()}
                </div>
                {estimatedPrice && (
                  <div className="text-sm">
                    Est: ${estimatedPrice.toLocaleString()}
                    {priceDifference && (
                      <span 
                        className={`ml-2 ${
                          isOverpriced ? 'text-red-600' : 
                          isGoodValue ? 'text-green-600' : 
                          'text-gray-600'
                        }`}
                      >
                        ({priceDifference > 0 ? '+' : ''}
                        ${priceDifference.toLocaleString()})
                      </span>
                    )}
                  </div>
                )}
              </div>

              {risks.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {risks.slice(0, 2).map((risk) => (
                    <span 
                      key={risk}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                    >
                      {risk}
                    </span>
                  ))}
                  {risks.length > 2 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      +{risks.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}