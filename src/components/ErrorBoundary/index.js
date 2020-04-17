import React, { Component } from 'react';

export default class ErrorDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
    }

    render() {
        const { children } = this.props;
        const { error, errorInfo } = this.state;

        return errorInfo ? (
            <div>
                <h2>이런! 뭔가 문제가 발생한것 같네요..</h2>
                <details>
                    {error && error.toString()}
                    <br/>
                    {errorInfo.componentStack}
                </details>
            </div>
        ) : (
            children || null
        );
    }
}