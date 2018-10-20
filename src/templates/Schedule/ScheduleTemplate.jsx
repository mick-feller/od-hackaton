import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import { Input } from 'components';

class ScheduleTemplate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        date: null,
        focussed: false
      }
    }

    render() {
        return (
            <div className="ScheduleTemplate">
                <SingleDatePicker
                  date={this.state.date} // momentPropTypes.momentObj or null
                  onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                  focused={this.state.focused} // PropTypes.bool
                  onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                  id="datePicker"
                  orientation="vertical" // PropTypes.string.isRequired,
                />
                Here is my scheduler
            </div>
        )
    }
}
  
export default ScheduleTemplate