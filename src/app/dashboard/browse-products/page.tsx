import React, { Suspense } from 'react';
import DashboardLayout from '@/components/Dashboard/DasboardLayout';
import BrowseProducts from '@/components/Dashboard/BrowseProducts';

const BrowseProductsPage = () => {
  return (
    <DashboardLayout>
      <Suspense fallback={<p>Loading...</p>}>
        <BrowseProducts />
      </Suspense>
    </DashboardLayout>
  );
};

export default BrowseProductsPage;
