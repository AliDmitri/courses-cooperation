import React from 'react';
import AceEditor from 'components/AceEditor/AceEditor';

export class Classroom extends React.Component {
  render () {
    return (
      <div>
        <div className="editor">
          <AceEditor value={"Игровой классс номер " + this.props.params.classroomId}/>
        </div>
        <div className="result"></div>
      </div>
    )
  }
}

export default Classroom;
