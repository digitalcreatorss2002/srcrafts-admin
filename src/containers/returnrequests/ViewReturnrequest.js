import React, { useEffect } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import Spinner from "../../components/layout/Spinner";
import {
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
  SIDEBAR_OPTIONS,
} from "../../shared/enums/returnrequests_enum";
import SingleView from "../../components/common/SingleView";
import { useSingleReturnrequest } from "../../shared/hooks/UseReturnrequest";
const ViewReturnrequest = ({ match }) => {
  const [data] = useSingleReturnrequest(match.params.id);
  const { returnrequest_loading, returnrequest } = data;
  return (
    <div className="pace-done">
      <div>
        <Header />
        <BreadCrumb
          title={PAGE_SINGLE_TITLE}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={LINK_URL}
          activeLink="View"
        />
        {!returnrequest_loading ? (
          returnrequest && (
            <SingleView
              data={returnrequest}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={returnrequest._id}
              SIDEBAR_OPTIONS={SIDEBAR_OPTIONS}
            />
          )
        ) : (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewReturnrequest;
