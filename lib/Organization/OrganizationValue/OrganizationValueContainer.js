import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import { stripesConnect } from '@folio/stripes/core';

import OrganizationValue from './OrganizationValue';
import { organizationByPropManifest } from '../../manifests';

const OrganizationValueContainer = ({ id, label, mutator }) => {
  const intl = useIntl();
  const [organization, setOrganization] = useState();

  useEffect(
    () => {
      setOrganization();

      if (id) {
        mutator.organizationValueOrg.GET()
          .then(setOrganization)
          .catch(() => setOrganization({
            id,
            name: intl.formatMessage({ id: 'stripes-acq-components.invalidReference' }),
          }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id],
  );

  return (
    <OrganizationValue
      label={label}
      value={organization?.name}
    />
  );
};

OrganizationValueContainer.manifest = Object.freeze({
  organizationValueOrg: organizationByPropManifest,
});

OrganizationValueContainer.propTypes = {
  id: PropTypes.string,
  label: PropTypes.node,
  mutator: PropTypes.object.isRequired,
};

OrganizationValueContainer.defaultProps = {
  label: <FormattedMessage id="stripes-acq-components.organization" />,
};

export default stripesConnect(OrganizationValueContainer);
