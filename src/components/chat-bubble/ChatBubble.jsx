import PropTypes from 'prop-types';
import { USER_CHAT_ROLE } from '../../hooks/useChatMessages';

const CHAT_BUBBLE_POSITION = {
  RIGHT: 'end',
  LEFT: 'start',
};

export const ChatBubble = ({ name, content, role }) => {
  const styles = {
    alignSelf: role !== USER_CHAT_ROLE.RECEIVER ? CHAT_BUBBLE_POSITION.RIGHT : CHAT_BUBBLE_POSITION.LEFT,
    backgroundColor: role === USER_CHAT_ROLE.RECEIVER && 'white',
  };

  return (
    <div
      className="mx-4 px-2 py-2 ring-emerald-700 ring-1 rounded w-fit max-w-xs leading-none bg-emerald-900/20 text-emerald-900 last:mb-4"
      style={styles}
    >
      <b className="mr-2 after:content-[':']">{name}</b>
      {content}
    </div>
  );
};

ChatBubble.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string,
  role: PropTypes.oneOf(Object.values(USER_CHAT_ROLE)),
};
