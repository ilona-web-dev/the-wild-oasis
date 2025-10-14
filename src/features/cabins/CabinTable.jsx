import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

function CabinTable() {
   const { isPending, cabins } = useCabins();
   const [searchParams] = useSearchParams();

   if (isPending) return <Spinner />;
   if (!cabins?.length) return <Empty resource="cabins" />;

   const filterValue = searchParams.get('discount') || 'all';

   // FILTER

   let filteredCabins = cabins.slice();
   if (filterValue === 'all') filteredCabins = cabins;
   if (filterValue === 'no-discount')
      filteredCabins = filteredCabins.filter((cabin) => cabin.discount === 0);
   if (filterValue === 'discount')
      filteredCabins = filteredCabins.filter((cabin) => cabin.discount > 0);

   // SORT

   const sortBy = searchParams.get('sortBy') || 'name-asc';
   const [field, direction] = sortBy.split('-');
   const modifier = direction === 'asc' ? 1 : -1;
   const sortedCabins = filteredCabins.slice().sort((a, b) => {
      if (field === 'name') return a.name.localeCompare(b.name) * modifier;
      return (a[field] - b[field]) * modifier;
   });

   return (
      <Menus>
         <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
            <Table.Header>
               <div></div>
               <div>Cabin</div>
               <div>Capacity</div>
               <div>Price</div>
               <div>Discount</div>
               <div></div>
            </Table.Header>
            <Table.Body
               data={sortedCabins}
               render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
            />
         </Table>
      </Menus>
   );
}

export default CabinTable;
