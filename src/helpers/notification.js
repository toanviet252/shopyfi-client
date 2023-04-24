import alertify from 'alertifyjs';

export default function notification(message, status) {
  alertify.set('notifier', 'position', 'top-right');
  alertify[status](message);
}
export const errorNotification = (message) => {
  return notification(message, 'error');
};
