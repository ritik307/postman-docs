import React from 'react';
import { Link } from 'gatsby';
import './LeftNav.scss';

const { v4: uuidv4 } = require('uuid');

const sectionHandler = (e) => {
  document.location.href = e.target.getAttribute('data-section');
};

const renderTwoLevelList = (item, runtime,) => {
  if (typeof document !== 'undefined') {
    const active = runtime ? document.location.pathname.match(item.parentSlug) : '';
  
    return (
      <ul key={uuidv4()}>
        <li className="parent">
          <div className="container">
            <div className="row">
              <div className="caret-wrapper">
                {runtime && <svg className={`caret${active ? ' active-caret' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" height="24" viewBox="0 0 24 24" width="24"><path clipRule="evenodd" d="m16.5303 8.96967c.2929.29289.2929.76777 0 1.06063l-4 4c-.2929.2929-.7677.2929-1.0606 0l-4.00003-4c-.29289-.29286-.29289-.76774 0-1.06063s.76777-.29289 1.06066 0l3.46967 3.46963 3.4697-3.46963c.2929-.29289.7677-.29289 1.0606 0z" fill="#707070" fillRule="evenodd" /></svg>}
              </div>
              <div className="col caret-sibling first-parent">
                <button
                  type="button"
                  data-click={item.name}
                  data-section={item.url}
                  onClick={sectionHandler}
                >
                  {item.name}
                </button>
              </div>
            </div>
          </div>
          {active && (
            <ul>
              {item.subMenuItems1.map(
                (sItem) => (sItem.url && (
                  <li key={uuidv4()} className={`child ${window.location.pathname === sItem.url ? 'currentUrl' : ''}`}>
                    <Link data-click={sItem.name} to={sItem.url}>{sItem.name}</Link>
                  </li>
                )) || (
                    <li
                      key={uuidv4()}
                      className="parent sub-parent"
                    >
                      <div className="container">
                        <div className="row">
                          <div className="caret-wrapper">
                            <svg className={`caret${(document.location.pathname.match(sItem.subParentSlug)) ? 'active-caret' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" height="24" viewBox="0 0 24 24" width="24"><path clipRule="evenodd" d="m16.5303 8.96967c.2929.29289.2929.76777 0 1.06063l-4 4c-.2929.2929-.7677.2929-1.0606 0l-4.00003-4c-.29289-.29286-.29289-.76774 0-1.06063s.76777-.29289 1.06066 0l3.46967 3.46963 3.4697-3.46963c.2929-.29289.7677-.29289 1.0606 0z" fill="#707070" fillRule="evenodd" /></svg>
                          </div>
                          <div className="col caret-sibling second-parent">
                            <button
                              type="button"
                              data-click={sItem.name}
                              data-section={sItem.slug}
                              onClick={sectionHandler}
                            >
                              {sItem.name}
                            </button>
                          </div>
                        </div>
                      </div>
                      {document.location.pathname.match(
                        sItem.subParentSlug,
                      ) && (
                          <ul>
                            {sItem.subMenuItems2.map(
                              (ssItem) => ssItem.url && (
                                <li key={uuidv4()} className={`child ${document.location.pathname === ssItem.url ? 'currentUrl' : ''}`}>
                                  <Link to={ssItem.url} data-click={sItem.name} className="ssItem second-child">{ssItem.name}</Link>
                                </li>
                              ),
                            )}
                          </ul>
                        )}
                    </li>
                  ),
              )}
            </ul>
          )}
        </li>
      </ul>
    );
  }
}

class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      props,
      runtime: true
    }
  }
  componentDidMount() {
    const isRuntime = typeof document === 'object';
    this.setState({
      runtime: isRuntime,
    })
  }
  render() {
    const { props, runtime } = this.state;
    const { leftNavItems = [] } = props;
    return (
      leftNavItems.map((item) => renderTwoLevelList(item, runtime))
    )
  }
}

export default LeftNav;
