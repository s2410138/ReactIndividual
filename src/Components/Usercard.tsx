import * as Userlist from '../Components/UserList.tsx'
import * as comp from '../Helpers/react_bootstrapComp';

function showdatetime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString('en-US', { hour12: false });
}

interface UserCardProps {
  user: Userlist.User;
}
/**
 * Represents a user profile
 * @param props 
 * @returns React.JSX.Element
 */
function UserCard(props: UserCardProps) {
  
    return (
          <comp.Col key={props.user.id}>
            <comp.Card className="h-100 shadow-sm">
              <comp.Card.Body>
                <comp.Card.Title>{props.user.displayName}</comp.Card.Title>
                <comp.Card.Subtitle className="mb-2 text-muted">{props.user.email}</comp.Card.Subtitle>
                <comp.Card.Subtitle className="mb-2 text-muted">{showdatetime(props.user.createdDate)}</comp.Card.Subtitle>
                <comp.Card.Text>
                </comp.Card.Text>
              </comp.Card.Body>
            </comp.Card>
          </comp.Col>
          );
}

export default UserCard;