import React from 'react';
import renderer from 'react-test-renderer';
import Home from '@/templates/page/home';
import { props } from './homeProps.data'
import WithProvider from "@/rootElement"

beforeEach(() => { // if you have an existing `beforeEach` just add the following lines to it
    fetchMock.mockIf(/^https?:\/\/example.com.*$/, req => {
        if (req.url.endsWith("/path1")) {
            return "some response body"
        } else if (req.url.endsWith("/path2")) {
            return {
                body: "another response body",
                headers: {
                    "X-Some-Response-Header": "Some header value"
                }
            }
        } else {
            return {
                status: 404,
                body: "Not Found"
            }
        }
    })
})

it('renders correctly', () => {

    const tree = renderer
        .create(
            <WithProvider
                element={
                    <Home {...props} />
                } />

        )
        .toJSON();
    expect(tree).toMatchSnapshot();
})


/* const homeProps:IHomeProps =  */