import React from 'react';
import { render, cleanup, act } from '@testing-library/react';

import OrganizationValue from './OrganizationValueContainer';

const renderOrganizationValue = (id, mutator, label) => (render(
  <OrganizationValue
    id={id}
    mutator={mutator}
    label={label}
  />,
));

describe('AcqCheckboxFilter component', () => {
  let mutator;

  beforeEach(() => {
    mutator = {
      organizationValueOrg: {
        GET: jest.fn(),
      },
    };
  });

  afterEach(cleanup);

  it('should not load organization when id is no defined', () => {
    renderOrganizationValue(undefined, mutator);

    expect(mutator.organizationValueOrg.GET).not.toHaveBeenCalled();
  });

  it('should load organziation when id is passed', async () => {
    let getByText;
    const organization = { name: 'EBSCO', id: '15' };

    mutator.organizationValueOrg.GET.mockReturnValue(Promise.resolve(organization));

    await act(async () => {
      getByText = renderOrganizationValue(organization.id, mutator).getByText;
    });

    expect(mutator.organizationValueOrg.GET).toHaveBeenCalled();
    expect(getByText(organization.name)).toBeDefined();
  });

  it('should display invalid reference if organization is not valid', async () => {
    let getByText;

    mutator.organizationValueOrg.GET.mockReturnValue(Promise.reject());

    await act(async () => {
      getByText = renderOrganizationValue('invalidOrgId', mutator).getByText;
    });

    expect(mutator.organizationValueOrg.GET).toHaveBeenCalled();
    expect(getByText('stripes-acq-components.invalidReference')).toBeDefined();
  });

  it('should display default label when it is not passed', () => {
    const { getByText } = renderOrganizationValue(undefined, mutator);

    expect(getByText('stripes-acq-components.organization')).toBeDefined();
  });

  it('should display passed label', () => {
    const orgValueLabel = 'Organization';
    const { getByText } = renderOrganizationValue(undefined, mutator, orgValueLabel);

    expect(getByText(orgValueLabel)).toBeDefined();
  });
});
