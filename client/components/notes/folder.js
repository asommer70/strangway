import React, { Component } from 'react';

class Folder extends Component {
  constructor(props) {
    super(props);

    this.state = { edit: false, folderName: (this.props.folder ? this.props.folder.name : '') }
  }

  handleChange(e) {
    this.setState({folderName: e.target.value});
  }

  updateFolder(e) {
    e.preventDefault();
    this.props.updateFolder(this.props.idx, this.state.folderName);
  }

  render() {
    const folderForm = (
      <form onSubmit={this.updateFolder.bind(this)}>
        <input type="text" value={this.state.folderName} onChange={this.handleChange.bind(this)} name="name" placeholder="Name" />

        <button type="button" className="button alert supertiny float-right" onClick={() => this.props.removeFolder(this.props.idx)}>
          <svg version="1.1" baseProfile="basic"
             xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="12px"
             viewBox="0 0 128 128" xmlSpace="preserve">
            <path transform="matrix(0.128,0,0,0.128,0,0)" stroke="none" style={{fill: '#ffffff'}} d="M 500 0 C 223 0 0 223 0 500 C 0 775 223 1000 500 1000 C 775 1000 1000 775 1000 500 C 1000 223 775 0 500 0 z M 500 850 C 306 850 149 693 149 500 C 149 306 306 149 500 149 C 693 149 850 306 850 500 C 850 693 693 850 500 850 z M 670 579 C 695 604 695 645 670 670 C 645 695 604 695 579 670 L 500 591 L 419 670 C 394 695 353 695 328 670 C 303 645 303 604 328 579 L 408 500 L 328 419 C 303 394 303 353 328 328 C 353 303 394 303 419 328 L 500 408 L 579 328 C 604 303 645 303 670 328 C 695 353 695 394 670 419 L 591 500 L 670 579 z"/>
          </svg>
        </button>
      </form>
    );

    return (
      <li>
        {this.props.folder.name}

        <div className="float-right">
          <button type="button" className="button supertiny" onClick={() => this.setState({edit: !this.state.edit})}>
            <svg version="1.1" baseProfile="basic"
               xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="12px"
               viewBox="0 0 128 128" xmlSpace="preserve">
              <path transform="matrix(0.128,0,0,0.128,0,0)" stroke="none" style={{fill: '#ffffff'}} d="M 698 70 L 768 0 L 1000 231 L 929 301 L 698 70 z M 117 717 L 64 935 L 282 882 L 117 717 z M 796 434 L 306 925 L 0 1000 L 74 693 L 565 203 L 796 434 L 796 434 z M 830 401 L 896 334 L 665 103 L 598 169 L 830 401 z"/>
            </svg>
          </button>

          {this.state.edit ? folderForm : ''}
        </div>
      </li>
    );
  }
}

export default Folder;
