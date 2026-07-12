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
} from "../../shared/enums/collections_enum";
import SingleView from "../../components/common/SingleView";
import { useSingleCollection } from "../../shared/hooks/UseCollection";
import {
  DYNAMIC_COLLECTION_CONDITION,
  DYNAMIC_COLLECTION_FIELDS,
} from "../../domain/Enums";
const ViewCollection = ({ match }) => {
  const [data] = useSingleCollection(match.params.id);
  const { collection_loading, collection } = data;
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
        {!collection_loading ? (
          collection && (
            <SingleView
              data={collection}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={collection._id}
              SIDEBAR_OPTIONS={SIDEBAR_OPTIONS}
            >
              {collection.is_dynamic_collection && (
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title"> Dynamic Fields </h4>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        {" "}
                        {collection.dynamic_collection &&
                          DYNAMIC_COLLECTION_FIELDS &&
                          DYNAMIC_COLLECTION_FIELDS.filter(
                            (item) =>
                              item.value == collection.dynamic_collection.field
                          ) &&
                          DYNAMIC_COLLECTION_FIELDS.filter(
                            (item) =>
                              item.value == collection.dynamic_collection.field
                          )[0] &&
                          DYNAMIC_COLLECTION_FIELDS.filter(
                            (item) =>
                              item.value == collection.dynamic_collection.field
                          )[0].label}
                      </div>
                      <div>
                        {" "}
                        {collection.dynamic_collection &&
                          DYNAMIC_COLLECTION_CONDITION &&
                          DYNAMIC_COLLECTION_CONDITION.filter(
                            (item) =>
                              item.value ==
                              collection.dynamic_collection.condition
                          ) &&
                          DYNAMIC_COLLECTION_CONDITION.filter(
                            (item) =>
                              item.value ==
                              collection.dynamic_collection.condition
                          )[0] &&
                          DYNAMIC_COLLECTION_CONDITION.filter(
                            (item) =>
                              item.value ==
                              collection.dynamic_collection.condition
                          )[0].label}{" "}
                      </div>
                      <div>
                        {" "}
                        {collection.dynamic_collection &&
                          collection.dynamic_collection.value}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SingleView>
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

export default ViewCollection;
