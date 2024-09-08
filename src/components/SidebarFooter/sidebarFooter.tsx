import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ReactSVG } from 'react-svg';
import IconeDiscord from '../../assets/IconeDiscord.svg';
import './sidebarFooter.scss';

interface SidebarFooterProps {
  isLoggedIn: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isLoggedIn }) => {
  return (
    <div className="sidebarFooter">
      <div className="sidebarFooterItem">
        <a href="#">
          <div>
            <ReactSVG src={IconeDiscord} className="iconeDiscord" />
            Comunidade
          </div>
          <div className="arrowIcons">
            <ArrowForwardIcon className="icons" />
          </div>
        </a>
      </div>
      <div className="sidebarFooterItem">
        <a href="/sobre-nos">
          <div>
            <HelpIcon className="icons" />
            Sobre
          </div>
          <div>
            <ArrowForwardIcon className="icons" />
          </div>
        </a>
      </div>
      {isLoggedIn && (
        <div className="sidebarFooterItem">
          <a href="#">
            <div>
              <LogoutIcon className="icons" />
              Logout
            </div>
            <div>
              <ArrowForwardIcon className="icons" />
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default SidebarFooter;
