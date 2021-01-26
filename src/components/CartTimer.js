import React from 'react';

class CartTimer extends React.Component {
    constructor(props) {
        super(props);

        const timeDiff = this.props.expiryDate - new Date().getTime();
        let seconds = Math.floor((timeDiff / 1000) % 60);
        let minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        let hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        this.state = {
            hours,
            minutes,
            seconds
        }
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { hours, minutes, seconds } = this.state;
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }));
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    if (hours === 0) {
                        clearInterval(this.myInterval);
                    } else {
                        this.setState(({ hours }) => ({
                            hours: hours - 1,
                            minutes: 59,
                            seconds: 59
                        }));
                    }
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }));
                }
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.myInterval);
    }

    render() {
         return (
            <div>
                Time Remaining: {this.state.hours} Hours, {this.state.minutes} Minutes, {this.state.seconds} Seconds
            </div>
        );
    }
}

export default CartTimer;