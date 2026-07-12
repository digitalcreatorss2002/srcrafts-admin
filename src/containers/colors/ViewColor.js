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
} from "../../shared/enums/colors_enum";
import SingleView from "../../components/common/SingleView";
import { useSingleColor } from "../../shared/hooks/UseColor";
const ViewColor = ({ match }) => {
  const [data] = useSingleColor(match.params.id);
  const { color_loading, color } = data;
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
        {!color_loading ? (
          color && (
            <SingleView
              data={color}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={color._id}
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

export default ViewColor;
