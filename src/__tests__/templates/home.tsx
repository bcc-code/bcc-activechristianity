import React from 'react';
import renderer from 'react-test-renderer';
import Home, { IHomeProps } from '@/templates/page/home'
import { props } from './homeProps'
it('renders correctly', () => {

    const tree = renderer
        .create(
            <Home {...props} />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
})


/* const homeProps:IHomeProps =  */