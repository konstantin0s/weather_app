import { render, screen } from '@testing-library/react';
import Home from './components/Home';
import React from 'react';
import { mount, wrapper, shallow } from 'enzyme';

describe("Home component",  () => {

    test('Home renders the text inside it', () => {
        const {getByText } = render(<Home />);
        const linkElement = getByText("Show Chronological");
        expect(linkElement).toBeInTheDocument();
      });

    //   const wrapper = shallow(<Home />);

    //   test('render the click event of hide button and change text', () => {
    //       wrapper.find('.btn-primary')[0].simulate('click');
    //       expect(wrapper.find('.btn-primary')[0].text()).toBe('Show');
    //   })

})