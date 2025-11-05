import styled from 'styled-components';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import Modal from '../../ui/Modal';

import { HiArrowUpOnSquare } from 'react-icons/hi2';
import { useBooking } from './useBooking';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';

import BookingDataBox from './BookingDataBox';
import ConfirmDelete from '../../ui/ConfirmDelete';

const HeadingGroup = styled.div`
   display: flex;
   gap: 2.4rem;
   align-items: center;
`;

function BookingDetail() {
   const { booking, isPending, error } = useBooking();
   const { checkout, isCheckingOut } = useCheckout();
   const { deleteBooking, isDeleting } = useDeleteBooking();

   const moveBack = useMoveBack();
   const navigate = useNavigate();

   if (isPending) return <Spinner />;
   if (error) return <Empty resourceName="booking" />;
   if (!booking) return <Empty resourceName="booking" />;

   const { status, id: bookingId } = booking;

   const statusToTagName = {
      unconfirmed: 'blue',
      'checked-in': 'green',
      'checked-out': 'silver',
   };

   return (
      <>
         <Row type="horizontal">
            <HeadingGroup>
               <Heading>Booking #{bookingId}</Heading>
               <Tag type={statusToTagName[status]}>
                  {status.replace('-', ' ')}
               </Tag>
            </HeadingGroup>
            <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
         </Row>

         <BookingDataBox booking={booking} />

         <ButtonGroup>
            {status === 'unconfirmed' && (
               <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                  Check in
               </Button>
            )}

            {status === 'checked-in' && (
               <Button
                  icon={<HiArrowUpOnSquare />}
                  onClick={() => checkout(bookingId)}
                  disabled={isCheckingOut}>
                  Check out
               </Button>
            )}

            <Modal>
               <Modal.Open opens="delete">
                  <Button variation="danger">Delete booking</Button>
               </Modal.Open>
               <Modal.Window name="delete">
                  <ConfirmDelete
                     resourceName="booking"
                     disabled={isDeleting}
                     onConfirm={() =>
                        deleteBooking(bookingId, {
                           onSettled: () => navigate(-1),
                        })
                     }>
                     Delete booking
                  </ConfirmDelete>
               </Modal.Window>
            </Modal>
         </ButtonGroup>
      </>
   );
}

export default BookingDetail;
