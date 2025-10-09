import CabinRow from './CabinRow';
import Table from '../../ui/Table';
import { useCabins } from './useCabins';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';

function CabinTable() {
   const { isPending, cabins } = useCabins();

   if (isPending) return <Spinner />;
   if (!cabins?.length) return <Empty resource="cabins" />;

   return (
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
            data={cabins}
            render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
         />
      </Table>
   );
}

export default CabinTable;
