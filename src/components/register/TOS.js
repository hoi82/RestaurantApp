import React, { Component } from 'react';

class TOS extends Component {
    render() {
        return (
            <div>
                <div>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sem ex, lobortis tincidunt augue sit amet, laoreet elementum mauris. Cras et rhoncus nulla. Praesent malesuada pretium lectus, pulvinar interdum orci blandit sit amet. Ut gravida enim at lorem vehicula, eu eleifend elit fringilla. Fusce a ultricies eros. In nec eros ut elit molestie aliquet. Sed efficitur orci in nulla lobortis condimentum. Quisque venenatis quis nisi interdum lacinia. Etiam odio enim, accumsan quis augue vitae, consequat vehicula quam. Ut venenatis, est quis condimentum imperdiet, lorem massa imperdiet tortor, eu venenatis nisi neque et tellus. Curabitur luctus diam ac pulvinar condimentum. In nibh purus, fringilla eu est vel, congue congue sem.

                        Proin vitae tempor quam. Proin dignissim tincidunt dui et lobortis. Integer purus leo, venenatis at sodales et, iaculis quis nunc. Nullam hendrerit, neque et efficitur blandit, odio odio mattis risus, et rhoncus dui eros id lectus. Proin ipsum neque, fermentum sed facilisis vitae, facilisis nec nulla. Aliquam posuere dui nec efficitur finibus. Integer tincidunt tincidunt suscipit. In nec magna massa. Proin ac nisl in turpis faucibus iaculis eget hendrerit massa. Maecenas nunc magna, scelerisque sed facilisis ac, elementum et ante. Sed luctus tristique enim a viverra. Curabitur id urna et metus malesuada suscipit bibendum at metus. Integer consequat arcu at lorem posuere maximus. Praesent tempus tortor massa, in suscipit sapien molestie et. Cras sit amet sem eleifend, commodo ipsum quis, condimentum libero.

                        Aenean commodo a massa ac condimentum. Maecenas eget turpis et velit faucibus tincidunt id consequat ante. Morbi et lectus pulvinar, venenatis risus non, tristique ante. Sed eu facilisis risus. Ut euismod erat nec orci sollicitudin, consequat rutrum risus tincidunt. In sem lorem, venenatis quis enim in, aliquet venenatis ipsum. Sed fermentum augue nunc, quis pharetra urna accumsan suscipit. Aenean maximus dignissim dui in vulputate. Fusce iaculis, nulla in vulputate gravida, tellus nunc elementum purus, vitae fermentum sapien libero finibus justo. Suspendisse sodales mi consectetur urna venenatis pulvinar.

                        Etiam quis rhoncus nulla. Mauris convallis lectus nulla, non rhoncus ligula accumsan in. Mauris mollis dolor a nisi facilisis, vel blandit nisl vestibulum. Nullam quis odio lobortis ipsum imperdiet congue. Ut eget dolor quis nulla rhoncus gravida eu quis nunc. Praesent lectus nunc, venenatis sed mollis a, eleifend ut nisl. Nam pretium leo nec est tempus, in posuere augue venenatis. Maecenas eu enim id lectus viverra commodo sit amet sed odio. Morbi in porttitor ex, congue ultrices mi. Nunc molestie ac ipsum sit amet rhoncus. Nullam et erat dapibus, fringilla velit sed, egestas mi. Suspendisse porta tellus nec mi iaculis facilisis. Nam a pulvinar metus.

                        Maecenas mattis faucibus enim, quis elementum est pretium a. Suspendisse dolor diam, tempus sit amet luctus quis, ultrices et tellus. Morbi eu dictum felis. Pellentesque non elit euismod, pretium sem ut, consectetur risus. Suspendisse sollicitudin faucibus mauris eu finibus. Nam quis sapien eu erat commodo scelerisque. Nulla pretium non ex ac malesuada. Donec imperdiet iaculis cursus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur consectetur, massa vitae accumsan ultrices, tellus augue tempus nunc, non hendrerit mi erat eu eros. Vivamus a iaculis neque.
                    </div>                
                </div>
                <div>
                    <button onClick={(e) => this.props.onConfirm(false)}>동의하지 않음</button>
                    <button onClick={(e) => this.props.onConfirm(true)}>동의함</button>
                </div>
            </div>
        );
    }
}

export default TOS; 