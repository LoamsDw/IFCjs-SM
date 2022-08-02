import {
    AmbientLight,
    AxesHelper,
    DirectionalLight,
    GridHelper,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    Raycaster,
    Loader,
    Vector2
} from "three";
import { IFCLoader } from "web-ifc-three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh";
import { MeshLambertMaterial } from "three";
import { MeshBasicMaterial } from "three";
import {
    IFCACTIONREQUEST,
    IFCACTOR,
    IFCACTORROLE,
    IFCACTUATOR,
    IFCACTUATORTYPE,
    IFCADDRESS,
    IFCADVANCEDBREP,
    IFCADVANCEDBREPWITHVOIDS,
    IFCADVANCEDFACE,
    IFCAIRTERMINAL,
    IFCAIRTERMINALBOX,
    IFCAIRTERMINALBOXTYPE,
    IFCAIRTERMINALTYPE,
    IFCAIRTOAIRHEATRECOVERY,
    IFCAIRTOAIRHEATRECOVERYTYPE,
    IFCALARM,
    IFCALARMTYPE,
    IFCALIGNMENT,
    IFCALIGNMENT2DHORIZONTAL,
    IFCALIGNMENT2DHORIZONTALSEGMENT,
    IFCALIGNMENT2DSEGMENT,
    IFCALIGNMENT2DVERSEGCIRCULARARC,
    IFCALIGNMENT2DVERSEGLINE,
    IFCALIGNMENT2DVERSEGPARABOLICARC,
    IFCALIGNMENT2DVERTICAL,
    IFCALIGNMENT2DVERTICALSEGMENT,
    IFCALIGNMENTCURVE,
    IFCANNOTATION,
    IFCANNOTATIONFILLAREA,
    IFCAPPLICATION,
    IFCAPPLIEDVALUE,
    IFCAPPROVAL,
    IFCAPPROVALRELATIONSHIP,
    IFCARBITRARYCLOSEDPROFILEDEF,
    IFCARBITRARYOPENPROFILEDEF,
    IFCARBITRARYPROFILEDEFWITHVOIDS,
    IFCASSET,
    IFCASYMMETRICISHAPEPROFILEDEF,
    IFCAUDIOVISUALAPPLIANCE,
    IFCAUDIOVISUALAPPLIANCETYPE,
    IFCAXIS1PLACEMENT,
    IFCAXIS2PLACEMENT2D,
    IFCAXIS2PLACEMENT3D,
    IFCBSPLINECURVE,
    IFCBSPLINECURVEWITHKNOTS,
    IFCBSPLINESURFACE,
    IFCBSPLINESURFACEWITHKNOTS,
    IFCBEAM,
    IFCBEAMSTANDARDCASE,
    IFCBEAMTYPE,
    IFCBEARING,
    IFCBEARINGTYPE,
    IFCBLOBTEXTURE,
    IFCBLOCK,
    IFCBOILER,
    IFCBOILERTYPE,
    IFCBOOLEANCLIPPINGRESULT,
    IFCBOOLEANRESULT,
    IFCBOUNDARYCONDITION,
    IFCBOUNDARYCURVE,
    IFCBOUNDARYEDGECONDITION,
    IFCBOUNDARYFACECONDITION,
    IFCBOUNDARYNODECONDITION,
    IFCBOUNDARYNODECONDITIONWARPING,
    IFCBOUNDEDCURVE,
    IFCBOUNDEDSURFACE,
    IFCBOUNDINGBOX,
    IFCBOXEDHALFSPACE,
    IFCBRIDGE,
    IFCBRIDGEPART,
    IFCBUILDING,
    IFCBUILDINGELEMENT,
    IFCBUILDINGELEMENTPART,
    IFCBUILDINGELEMENTPARTTYPE,
    IFCBUILDINGELEMENTPROXY,
    IFCBUILDINGELEMENTPROXYTYPE,
    IFCBUILDINGELEMENTTYPE,
    IFCBUILDINGSTOREY,
    IFCBUILDINGSYSTEM,
    IFCBURNER,
    IFCBURNERTYPE,
    IFCCSHAPEPROFILEDEF,
    IFCCABLECARRIERFITTING,
    IFCCABLECARRIERFITTINGTYPE,
    IFCCABLECARRIERSEGMENT,
    IFCCABLECARRIERSEGMENTTYPE,
    IFCCABLEFITTING,
    IFCCABLEFITTINGTYPE,
    IFCCABLESEGMENT,
    IFCCABLESEGMENTTYPE,
    IFCCAISSONFOUNDATION,
    IFCCAISSONFOUNDATIONTYPE,
    IFCCARTESIANPOINT,
    IFCCARTESIANPOINTLIST,
    IFCCARTESIANPOINTLIST2D,
    IFCCARTESIANPOINTLIST3D,
    IFCCARTESIANTRANSFORMATIONOPERATOR,
    IFCCARTESIANTRANSFORMATIONOPERATOR2D,
    IFCCARTESIANTRANSFORMATIONOPERATOR2DNONUNIFORM,
    IFCCARTESIANTRANSFORMATIONOPERATOR3D,
    IFCCARTESIANTRANSFORMATIONOPERATOR3DNONUNIFORM,
    IFCCENTERLINEPROFILEDEF,
    IFCCHILLER,
    IFCCHILLERTYPE,
    IFCCHIMNEY,
    IFCCHIMNEYTYPE,
    IFCCIRCLE,
    IFCCIRCLEHOLLOWPROFILEDEF,
    IFCCIRCLEPROFILEDEF,
    IFCCIRCULARARCSEGMENT2D,
    IFCCIVILELEMENT,
    IFCCIVILELEMENTTYPE,
    IFCCLASSIFICATION,
    IFCCLASSIFICATIONREFERENCE,
    IFCCLOSEDSHELL,
    IFCCOIL,
    IFCCOILTYPE,
    IFCCOLOURRGB,
    IFCCOLOURRGBLIST,
    IFCCOLOURSPECIFICATION,
    IFCCOLUMN,
    IFCCOLUMNSTANDARDCASE,
    IFCCOLUMNTYPE,
    IFCCOMMUNICATIONSAPPLIANCE,
    IFCCOMMUNICATIONSAPPLIANCETYPE,
    IFCCOMPLEXPROPERTY,
    IFCCOMPLEXPROPERTYTEMPLATE,
    IFCCOMPOSITECURVE,
    IFCCOMPOSITECURVEONSURFACE,
    IFCCOMPOSITECURVESEGMENT,
    IFCCOMPOSITEPROFILEDEF,
    IFCCOMPRESSOR,
    IFCCOMPRESSORTYPE,
    IFCCONDENSER,
    IFCCONDENSERTYPE,
    IFCCONIC,
    IFCCONNECTEDFACESET,
    IFCCONNECTIONCURVEGEOMETRY,
    IFCCONNECTIONGEOMETRY,
    IFCCONNECTIONPOINTECCENTRICITY,
    IFCCONNECTIONPOINTGEOMETRY,
    IFCCONNECTIONSURFACEGEOMETRY,
    IFCCONNECTIONVOLUMEGEOMETRY,
    IFCCONSTRAINT,
    IFCCONSTRUCTIONEQUIPMENTRESOURCE,
    IFCCONSTRUCTIONEQUIPMENTRESOURCETYPE,
    IFCCONSTRUCTIONMATERIALRESOURCE,
    IFCCONSTRUCTIONMATERIALRESOURCETYPE,
    IFCCONSTRUCTIONPRODUCTRESOURCE,
    IFCCONSTRUCTIONPRODUCTRESOURCETYPE,
    IFCCONSTRUCTIONRESOURCE,
    IFCCONSTRUCTIONRESOURCETYPE,
    IFCCONTEXT,
    IFCCONTEXTDEPENDENTUNIT,
    IFCCONTROL,
    IFCCONTROLLER,
    IFCCONTROLLERTYPE,
    IFCCONVERSIONBASEDUNIT,
    IFCCONVERSIONBASEDUNITWITHOFFSET,
    IFCCOOLEDBEAM,
    IFCCOOLEDBEAMTYPE,
    IFCCOOLINGTOWER,
    IFCCOOLINGTOWERTYPE,
    IFCCOORDINATEOPERATION,
    IFCCOORDINATEREFERENCESYSTEM,
    IFCCOSTITEM,
    IFCCOSTSCHEDULE,
    IFCCOSTVALUE,
    IFCCOVERING,
    IFCCOVERINGTYPE,
    IFCCREWRESOURCE,
    IFCCREWRESOURCETYPE,
    IFCCSGPRIMITIVE3D,
    IFCCSGSOLID,
    IFCCURRENCYRELATIONSHIP,
    IFCCURTAINWALL,
    IFCCURTAINWALLTYPE,
    IFCCURVE,
    IFCCURVEBOUNDEDPLANE,
    IFCCURVEBOUNDEDSURFACE,
    IFCCURVESEGMENT2D,
    IFCCURVESTYLE,
    IFCCURVESTYLEFONT,
    IFCCURVESTYLEFONTANDSCALING,
    IFCCURVESTYLEFONTPATTERN,
    IFCCYLINDRICALSURFACE,
    IFCDAMPER,
    IFCDAMPERTYPE,
    IFCDEEPFOUNDATION,
    IFCDEEPFOUNDATIONTYPE,
    IFCDERIVEDPROFILEDEF,
    IFCDERIVEDUNIT,
    IFCDERIVEDUNITELEMENT,
    IFCDIMENSIONALEXPONENTS,
    IFCDIRECTION,
    IFCDISCRETEACCESSORY,
    IFCDISCRETEACCESSORYTYPE,
    IFCDISTANCEEXPRESSION,
    IFCDISTRIBUTIONCHAMBERELEMENT,
    IFCDISTRIBUTIONCHAMBERELEMENTTYPE,
    IFCDISTRIBUTIONCIRCUIT,
    IFCDISTRIBUTIONCONTROLELEMENT,
    IFCDISTRIBUTIONCONTROLELEMENTTYPE,
    IFCDISTRIBUTIONELEMENT,
    IFCDISTRIBUTIONELEMENTTYPE,
    IFCDISTRIBUTIONFLOWELEMENT,
    IFCDISTRIBUTIONFLOWELEMENTTYPE,
    IFCDISTRIBUTIONPORT,
    IFCDISTRIBUTIONSYSTEM,
    IFCDOCUMENTINFORMATION,
    IFCDOCUMENTINFORMATIONRELATIONSHIP,
    IFCDOCUMENTREFERENCE,
    IFCDOOR,
    IFCDOORLININGPROPERTIES,
    IFCDOORPANELPROPERTIES,
    IFCDOORSTANDARDCASE,
    IFCDOORSTYLE,
    IFCDOORTYPE,
    IFCDRAUGHTINGPREDEFINEDCOLOUR,
    IFCDRAUGHTINGPREDEFINEDCURVEFONT,
    IFCDUCTFITTING,
    IFCDUCTFITTINGTYPE,
    IFCDUCTSEGMENT,
    IFCDUCTSEGMENTTYPE,
    IFCDUCTSILENCER,
    IFCDUCTSILENCERTYPE,
    IFCEDGE,
    IFCEDGECURVE,
    IFCEDGELOOP,
    IFCELECTRICAPPLIANCE,
    IFCELECTRICAPPLIANCETYPE,
    IFCELECTRICDISTRIBUTIONBOARD,
    IFCELECTRICDISTRIBUTIONBOARDTYPE,
    IFCELECTRICFLOWSTORAGEDEVICE,
    IFCELECTRICFLOWSTORAGEDEVICETYPE,
    IFCELECTRICGENERATOR,
    IFCELECTRICGENERATORTYPE,
    IFCELECTRICMOTOR,
    IFCELECTRICMOTORTYPE,
    IFCELECTRICTIMECONTROL,
    IFCELECTRICTIMECONTROLTYPE,
    IFCELEMENT,
    IFCELEMENTASSEMBLY,
    IFCELEMENTASSEMBLYTYPE,
    IFCELEMENTCOMPONENT,
    IFCELEMENTCOMPONENTTYPE,
    IFCELEMENTQUANTITY,
    IFCELEMENTTYPE,
    IFCELEMENTARYSURFACE,
    IFCELLIPSE,
    IFCELLIPSEPROFILEDEF,
    IFCENERGYCONVERSIONDEVICE,
    IFCENERGYCONVERSIONDEVICETYPE,
    IFCENGINE,
    IFCENGINETYPE,
    IFCEVAPORATIVECOOLER,
    IFCEVAPORATIVECOOLERTYPE,
    IFCEVAPORATOR,
    IFCEVAPORATORTYPE,
    IFCEVENT,
    IFCEVENTTIME,
    IFCEVENTTYPE,
    IFCEXTENDEDPROPERTIES,
    IFCEXTERNALINFORMATION,
    IFCEXTERNALREFERENCE,
    IFCEXTERNALREFERENCERELATIONSHIP,
    IFCEXTERNALSPATIALELEMENT,
    IFCEXTERNALSPATIALSTRUCTUREELEMENT,
    IFCEXTERNALLYDEFINEDHATCHSTYLE,
    IFCEXTERNALLYDEFINEDSURFACESTYLE,
    IFCEXTERNALLYDEFINEDTEXTFONT,
    IFCEXTRUDEDAREASOLID,
    IFCEXTRUDEDAREASOLIDTAPERED,
    IFCFACE,
    IFCFACEBASEDSURFACEMODEL,
    IFCFACEBOUND,
    IFCFACEOUTERBOUND,
    IFCFACESURFACE,
    IFCFACETEDBREP,
    IFCFACETEDBREPWITHVOIDS,
    IFCFACILITY,
    IFCFACILITYPART,
    IFCFAILURECONNECTIONCONDITION,
    IFCFAN,
    IFCFANTYPE,
    IFCFASTENER,
    IFCFASTENERTYPE,
    IFCFEATUREELEMENT,
    IFCFEATUREELEMENTADDITION,
    IFCFEATUREELEMENTSUBTRACTION,
    IFCFILLAREASTYLE,
    IFCFILLAREASTYLEHATCHING,
    IFCFILLAREASTYLETILES,
    IFCFILTER,
    IFCFILTERTYPE,
    IFCFIRESUPPRESSIONTERMINAL,
    IFCFIRESUPPRESSIONTERMINALTYPE,
    IFCFIXEDREFERENCESWEPTAREASOLID,
    IFCFLOWCONTROLLER,
    IFCFLOWCONTROLLERTYPE,
    IFCFLOWFITTING,
    IFCFLOWFITTINGTYPE,
    IFCFLOWINSTRUMENT,
    IFCFLOWINSTRUMENTTYPE,
    IFCFLOWMETER,
    IFCFLOWMETERTYPE,
    IFCFLOWMOVINGDEVICE,
    IFCFLOWMOVINGDEVICETYPE,
    IFCFLOWSEGMENT,
    IFCFLOWSEGMENTTYPE,
    IFCFLOWSTORAGEDEVICE,
    IFCFLOWSTORAGEDEVICETYPE,
    IFCFLOWTERMINAL,
    IFCFLOWTERMINALTYPE,
    IFCFLOWTREATMENTDEVICE,
    IFCFLOWTREATMENTDEVICETYPE,
    IFCFOOTING,
    IFCFOOTINGTYPE,
    IFCFURNISHINGELEMENT,
    IFCFURNISHINGELEMENTTYPE,
    IFCFURNITURE,
    IFCFURNITURETYPE,
    IFCGEOGRAPHICELEMENT,
    IFCGEOGRAPHICELEMENTTYPE,
    IFCGEOMETRICCURVESET,
    IFCGEOMETRICREPRESENTATIONCONTEXT,
    IFCGEOMETRICREPRESENTATIONITEM,
    IFCGEOMETRICREPRESENTATIONSUBCONTEXT,
    IFCGEOMETRICSET,
    IFCGRID,
    IFCGRIDAXIS,
    IFCGRIDPLACEMENT,
    IFCGROUP,
    IFCHALFSPACESOLID,
    IFCHEATEXCHANGER,
    IFCHEATEXCHANGERTYPE,
    IFCHUMIDIFIER,
    IFCHUMIDIFIERTYPE,
    IFCISHAPEPROFILEDEF,
    IFCIMAGETEXTURE,
    IFCINDEXEDCOLOURMAP,
    IFCINDEXEDPOLYCURVE,
    IFCINDEXEDPOLYGONALFACE,
    IFCINDEXEDPOLYGONALFACEWITHVOIDS,
    IFCINDEXEDTEXTUREMAP,
    IFCINDEXEDTRIANGLETEXTUREMAP,
    IFCINTERCEPTOR,
    IFCINTERCEPTORTYPE,
    IFCINTERSECTIONCURVE,
    IFCINVENTORY,
    IFCIRREGULARTIMESERIES,
    IFCIRREGULARTIMESERIESVALUE,
    IFCJUNCTIONBOX,
    IFCJUNCTIONBOXTYPE,
    IFCLSHAPEPROFILEDEF,
    IFCLABORRESOURCE,
    IFCLABORRESOURCETYPE,
    IFCLAGTIME,
    IFCLAMP,
    IFCLAMPTYPE,
    IFCLIBRARYINFORMATION,
    IFCLIBRARYREFERENCE,
    IFCLIGHTDISTRIBUTIONDATA,
    IFCLIGHTFIXTURE,
    IFCLIGHTFIXTURETYPE,
    IFCLIGHTINTENSITYDISTRIBUTION,
    IFCLIGHTSOURCE,
    IFCLIGHTSOURCEAMBIENT,
    IFCLIGHTSOURCEDIRECTIONAL,
    IFCLIGHTSOURCEGONIOMETRIC,
    IFCLIGHTSOURCEPOSITIONAL,
    IFCLIGHTSOURCESPOT,
    IFCLINE,
    IFCLINESEGMENT2D,
    IFCLINEARPLACEMENT,
    IFCLINEARPOSITIONINGELEMENT,
    IFCLOCALPLACEMENT,
    IFCLOOP,
    IFCMANIFOLDSOLIDBREP,
    IFCMAPCONVERSION,
    IFCMAPPEDITEM,
    IFCMATERIAL,
    IFCMATERIALCLASSIFICATIONRELATIONSHIP,
    IFCMATERIALCONSTITUENT,
    IFCMATERIALCONSTITUENTSET,
    IFCMATERIALDEFINITION,
    IFCMATERIALDEFINITIONREPRESENTATION,
    IFCMATERIALLAYER,
    IFCMATERIALLAYERSET,
    IFCMATERIALLAYERSETUSAGE,
    IFCMATERIALLAYERWITHOFFSETS,
    IFCMATERIALLIST,
    IFCMATERIALPROFILE,
    IFCMATERIALPROFILESET,
    IFCMATERIALPROFILESETUSAGE,
    IFCMATERIALPROFILESETUSAGETAPERING,
    IFCMATERIALPROFILEWITHOFFSETS,
    IFCMATERIALPROPERTIES,
    IFCMATERIALRELATIONSHIP,
    IFCMATERIALUSAGEDEFINITION,
    IFCMEASUREWITHUNIT,
    IFCMECHANICALFASTENER,
    IFCMECHANICALFASTENERTYPE,
    IFCMEDICALDEVICE,
    IFCMEDICALDEVICETYPE,
    IFCMEMBER,
    IFCMEMBERSTANDARDCASE,
    IFCMEMBERTYPE,
    IFCMETRIC,
    IFCMIRROREDPROFILEDEF,
    IFCMONETARYUNIT,
    IFCMOTORCONNECTION,
    IFCMOTORCONNECTIONTYPE,
    IFCNAMEDUNIT,
    IFCOBJECT,
    IFCOBJECTDEFINITION,
    IFCOBJECTPLACEMENT,
    IFCOBJECTIVE,
    IFCOCCUPANT,
    IFCOFFSETCURVE,
    IFCOFFSETCURVE2D,
    IFCOFFSETCURVE3D,
    IFCOFFSETCURVEBYDISTANCES,
    IFCOPENSHELL,
    IFCOPENINGELEMENT,
    IFCOPENINGSTANDARDCASE,
    IFCORGANIZATION,
    IFCORGANIZATIONRELATIONSHIP,
    IFCORIENTATIONEXPRESSION,
    IFCORIENTEDEDGE,
    IFCOUTERBOUNDARYCURVE,
    IFCOUTLET,
    IFCOUTLETTYPE,
    IFCOWNERHISTORY,
    IFCPARAMETERIZEDPROFILEDEF,
    IFCPATH,
    IFCPCURVE,
    IFCPERFORMANCEHISTORY,
    IFCPERMEABLECOVERINGPROPERTIES,
    IFCPERMIT,
    IFCPERSON,
    IFCPERSONANDORGANIZATION,
    IFCPHYSICALCOMPLEXQUANTITY,
    IFCPHYSICALQUANTITY,
    IFCPHYSICALSIMPLEQUANTITY,
    IFCPILE,
    IFCPILETYPE,
    IFCPIPEFITTING,
    IFCPIPEFITTINGTYPE,
    IFCPIPESEGMENT,
    IFCPIPESEGMENTTYPE,
    IFCPIXELTEXTURE,
    IFCPLACEMENT,
    IFCPLANARBOX,
    IFCPLANAREXTENT,
    IFCPLANE,
    IFCPLATE,
    IFCPLATESTANDARDCASE,
    IFCPLATETYPE,
    IFCPOINT,
    IFCPOINTONCURVE,
    IFCPOINTONSURFACE,
    IFCPOLYLOOP,
    IFCPOLYGONALBOUNDEDHALFSPACE,
    IFCPOLYGONALFACESET,
    IFCPOLYLINE,
    IFCPORT,
    IFCPOSITIONINGELEMENT,
    IFCPOSTALADDRESS,
    IFCPREDEFINEDCOLOUR,
    IFCPREDEFINEDCURVEFONT,
    IFCPREDEFINEDITEM,
    IFCPREDEFINEDPROPERTIES,
    IFCPREDEFINEDPROPERTYSET,
    IFCPREDEFINEDTEXTFONT,
    IFCPRESENTATIONITEM,
    IFCPRESENTATIONLAYERASSIGNMENT,
    IFCPRESENTATIONLAYERWITHSTYLE,
    IFCPRESENTATIONSTYLE,
    IFCPRESENTATIONSTYLEASSIGNMENT,
    IFCPROCEDURE,
    IFCPROCEDURETYPE,
    IFCPROCESS,
    IFCPRODUCT,
    IFCPRODUCTDEFINITIONSHAPE,
    IFCPRODUCTREPRESENTATION,
    IFCPROFILEDEF,
    IFCPROFILEPROPERTIES,
    IFCPROJECT,
    IFCPROJECTLIBRARY,
    IFCPROJECTORDER,
    IFCPROJECTEDCRS,
    IFCPROJECTIONELEMENT,
    IFCPROPERTY,
    IFCPROPERTYABSTRACTION,
    IFCPROPERTYBOUNDEDVALUE,
    IFCPROPERTYDEFINITION,
    IFCPROPERTYDEPENDENCYRELATIONSHIP,
    IFCPROPERTYENUMERATEDVALUE,
    IFCPROPERTYENUMERATION,
    IFCPROPERTYLISTVALUE,
    IFCPROPERTYREFERENCEVALUE,
    IFCPROPERTYSET,
    IFCPROPERTYSETDEFINITION,
    IFCPROPERTYSETTEMPLATE,
    IFCPROPERTYSINGLEVALUE,
    IFCPROPERTYTABLEVALUE,
    IFCPROPERTYTEMPLATE,
    IFCPROPERTYTEMPLATEDEFINITION,
    IFCPROTECTIVEDEVICE,
    IFCPROTECTIVEDEVICETRIPPINGUNIT,
    IFCPROTECTIVEDEVICETRIPPINGUNITTYPE,
    IFCPROTECTIVEDEVICETYPE,
    IFCPROXY,
    IFCPUMP,
    IFCPUMPTYPE,
    IFCQUANTITYAREA,
    IFCQUANTITYCOUNT,
    IFCQUANTITYLENGTH,
    IFCQUANTITYSET,
    IFCQUANTITYTIME,
    IFCQUANTITYVOLUME,
    IFCQUANTITYWEIGHT,
    IFCRAILING,
    IFCRAILINGTYPE,
    IFCRAMP,
    IFCRAMPFLIGHT,
    IFCRAMPFLIGHTTYPE,
    IFCRAMPTYPE,
    IFCRATIONALBSPLINECURVEWITHKNOTS,
    IFCRATIONALBSPLINESURFACEWITHKNOTS,
    IFCRECTANGLEHOLLOWPROFILEDEF,
    IFCRECTANGLEPROFILEDEF,
    IFCRECTANGULARPYRAMID,
    IFCRECTANGULARTRIMMEDSURFACE,
    IFCRECURRENCEPATTERN,
    IFCREFERENCE,
    IFCREFERENT,
    IFCREGULARTIMESERIES,
    IFCREINFORCEMENTBARPROPERTIES,
    IFCREINFORCEMENTDEFINITIONPROPERTIES,
    IFCREINFORCINGBAR,
    IFCREINFORCINGBARTYPE,
    IFCREINFORCINGELEMENT,
    IFCREINFORCINGELEMENTTYPE,
    IFCREINFORCINGMESH,
    IFCREINFORCINGMESHTYPE,
    IFCRELAGGREGATES,
    IFCRELASSIGNS,
    IFCRELASSIGNSTOACTOR,
    IFCRELASSIGNSTOCONTROL,
    IFCRELASSIGNSTOGROUP,
    IFCRELASSIGNSTOGROUPBYFACTOR,
    IFCRELASSIGNSTOPROCESS,
    IFCRELASSIGNSTOPRODUCT,
    IFCRELASSIGNSTORESOURCE,
    IFCRELASSOCIATES,
    IFCRELASSOCIATESAPPROVAL,
    IFCRELASSOCIATESCLASSIFICATION,
    IFCRELASSOCIATESCONSTRAINT,
    IFCRELASSOCIATESDOCUMENT,
    IFCRELASSOCIATESLIBRARY,
    IFCRELASSOCIATESMATERIAL,
    IFCRELCONNECTS,
    IFCRELCONNECTSELEMENTS,
    IFCRELCONNECTSPATHELEMENTS,
    IFCRELCONNECTSPORTTOELEMENT,
    IFCRELCONNECTSPORTS,
    IFCRELCONNECTSSTRUCTURALACTIVITY,
    IFCRELCONNECTSSTRUCTURALMEMBER,
    IFCRELCONNECTSWITHECCENTRICITY,
    IFCRELCONNECTSWITHREALIZINGELEMENTS,
    IFCRELCONTAINEDINSPATIALSTRUCTURE,
    IFCRELCOVERSBLDGELEMENTS,
    IFCRELCOVERSSPACES,
    IFCRELDECLARES,
    IFCRELDECOMPOSES,
    IFCRELDEFINES,
    IFCRELDEFINESBYOBJECT,
    IFCRELDEFINESBYPROPERTIES,
    IFCRELDEFINESBYTEMPLATE,
    IFCRELDEFINESBYTYPE,
    IFCRELFILLSELEMENT,
    IFCRELFLOWCONTROLELEMENTS,
    IFCRELINTERFERESELEMENTS,
    IFCRELNESTS,
    IFCRELPOSITIONS,
    IFCRELPROJECTSELEMENT,
    IFCRELREFERENCEDINSPATIALSTRUCTURE,
    IFCRELSEQUENCE,
    IFCRELSERVICESBUILDINGS,
    IFCRELSPACEBOUNDARY,
    IFCRELSPACEBOUNDARY1STLEVEL,
    IFCRELSPACEBOUNDARY2NDLEVEL,
    IFCRELVOIDSELEMENT,
    IFCRELATIONSHIP,
    IFCREPARAMETRISEDCOMPOSITECURVESEGMENT,
    IFCREPRESENTATION,
    IFCREPRESENTATIONCONTEXT,
    IFCREPRESENTATIONITEM,
    IFCREPRESENTATIONMAP,
    IFCRESOURCE,
    IFCRESOURCEAPPROVALRELATIONSHIP,
    IFCRESOURCECONSTRAINTRELATIONSHIP,
    IFCRESOURCELEVELRELATIONSHIP,
    IFCRESOURCETIME,
    IFCREVOLVEDAREASOLID,
    IFCREVOLVEDAREASOLIDTAPERED,
    IFCRIGHTCIRCULARCONE,
    IFCRIGHTCIRCULARCYLINDER,
    IFCROOF,
    IFCROOFTYPE,
    IFCSIUNIT,
    IFCSANITARYTERMINAL,
    IFCSANITARYTERMINALTYPE,
    IFCSCHEDULINGTIME,
    IFCSEAMCURVE,
    IFCSECTIONPROPERTIES,
    IFCSECTIONREINFORCEMENTPROPERTIES,
    IFCSECTIONEDSOLID,
    IFCSECTIONEDSOLIDHORIZONTAL,
    IFCSECTIONEDSPINE,
    IFCSENSOR,
    IFCSENSORTYPE,
    IFCSHADINGDEVICE,
    IFCSHADINGDEVICETYPE,
    IFCSHAPEASPECT,
    IFCSHAPEMODEL,
    IFCSHAPEREPRESENTATION,
    IFCSHELLBASEDSURFACEMODEL,
    IFCSIMPLEPROPERTY,
    IFCSIMPLEPROPERTYTEMPLATE,
    IFCSITE,
    IFCSLAB,
    IFCSLABELEMENTEDCASE,
    IFCSLABSTANDARDCASE,
    IFCSLABTYPE,
    IFCSLIPPAGECONNECTIONCONDITION,
    IFCSOLARDEVICE,
    IFCSOLARDEVICETYPE,
    IFCSOLIDMODEL,
    IFCSPACE,
    IFCSPACEHEATER,
    IFCSPACEHEATERTYPE,
    IFCSPACETYPE,
    IFCSPATIALELEMENT,
    IFCSPATIALELEMENTTYPE,
    IFCSPATIALSTRUCTUREELEMENT,
    IFCSPATIALSTRUCTUREELEMENTTYPE,
    IFCSPATIALZONE,
    IFCSPATIALZONETYPE,
    IFCSPHERE,
    IFCSPHERICALSURFACE,
    IFCSTACKTERMINAL,
    IFCSTACKTERMINALTYPE,
    IFCSTAIR,
    IFCSTAIRFLIGHT,
    IFCSTAIRFLIGHTTYPE,
    IFCSTAIRTYPE,
    IFCSTRUCTURALACTION,
    IFCSTRUCTURALACTIVITY,
    IFCSTRUCTURALANALYSISMODEL,
    IFCSTRUCTURALCONNECTION,
    IFCSTRUCTURALCONNECTIONCONDITION,
    IFCSTRUCTURALCURVEACTION,
    IFCSTRUCTURALCURVECONNECTION,
    IFCSTRUCTURALCURVEMEMBER,
    IFCSTRUCTURALCURVEMEMBERVARYING,
    IFCSTRUCTURALCURVEREACTION,
    IFCSTRUCTURALITEM,
    IFCSTRUCTURALLINEARACTION,
    IFCSTRUCTURALLOAD,
    IFCSTRUCTURALLOADCASE,
    IFCSTRUCTURALLOADCONFIGURATION,
    IFCSTRUCTURALLOADGROUP,
    IFCSTRUCTURALLOADLINEARFORCE,
    IFCSTRUCTURALLOADORRESULT,
    IFCSTRUCTURALLOADPLANARFORCE,
    IFCSTRUCTURALLOADSINGLEDISPLACEMENT,
    IFCSTRUCTURALLOADSINGLEDISPLACEMENTDISTORTION,
    IFCSTRUCTURALLOADSINGLEFORCE,
    IFCSTRUCTURALLOADSINGLEFORCEWARPING,
    IFCSTRUCTURALLOADSTATIC,
    IFCSTRUCTURALLOADTEMPERATURE,
    IFCSTRUCTURALMEMBER,
    IFCSTRUCTURALPLANARACTION,
    IFCSTRUCTURALPOINTACTION,
    IFCSTRUCTURALPOINTCONNECTION,
    IFCSTRUCTURALPOINTREACTION,
    IFCSTRUCTURALREACTION,
    IFCSTRUCTURALRESULTGROUP,
    IFCSTRUCTURALSURFACEACTION,
    IFCSTRUCTURALSURFACECONNECTION,
    IFCSTRUCTURALSURFACEMEMBER,
    IFCSTRUCTURALSURFACEMEMBERVARYING,
    IFCSTRUCTURALSURFACEREACTION,
    IFCSTYLEMODEL,
    IFCSTYLEDITEM,
    IFCSTYLEDREPRESENTATION,
    IFCSUBCONTRACTRESOURCE,
    IFCSUBCONTRACTRESOURCETYPE,
    IFCSUBEDGE,
    IFCSURFACE,
    IFCSURFACECURVE,
    IFCSURFACECURVESWEPTAREASOLID,
    IFCSURFACEFEATURE,
    IFCSURFACEOFLINEAREXTRUSION,
    IFCSURFACEOFREVOLUTION,
    IFCSURFACEREINFORCEMENTAREA,
    IFCSURFACESTYLE,
    IFCSURFACESTYLELIGHTING,
    IFCSURFACESTYLEREFRACTION,
    IFCSURFACESTYLERENDERING,
    IFCSURFACESTYLESHADING,
    IFCSURFACESTYLEWITHTEXTURES,
    IFCSURFACETEXTURE,
    IFCSWEPTAREASOLID,
    IFCSWEPTDISKSOLID,
    IFCSWEPTDISKSOLIDPOLYGONAL,
    IFCSWEPTSURFACE,
    IFCSWITCHINGDEVICE,
    IFCSWITCHINGDEVICETYPE,
    IFCSYSTEM,
    IFCSYSTEMFURNITUREELEMENT,
    IFCSYSTEMFURNITUREELEMENTTYPE,
    IFCTSHAPEPROFILEDEF,
    IFCTABLE,
    IFCTABLECOLUMN,
    IFCTABLEROW,
    IFCTANK,
    IFCTANKTYPE,
    IFCTASK,
    IFCTASKTIME,
    IFCTASKTIMERECURRING,
    IFCTASKTYPE,
    IFCTELECOMADDRESS,
    IFCTENDON,
    IFCTENDONANCHOR,
    IFCTENDONANCHORTYPE,
    IFCTENDONCONDUIT,
    IFCTENDONCONDUITTYPE,
    IFCTENDONTYPE,
    IFCTESSELLATEDFACESET,
    IFCTESSELLATEDITEM,
    IFCTEXTLITERAL,
    IFCTEXTLITERALWITHEXTENT,
    IFCTEXTSTYLE,
    IFCTEXTSTYLEFONTMODEL,
    IFCTEXTSTYLEFORDEFINEDFONT,
    IFCTEXTSTYLETEXTMODEL,
    IFCTEXTURECOORDINATE,
    IFCTEXTURECOORDINATEGENERATOR,
    IFCTEXTUREMAP,
    IFCTEXTUREVERTEX,
    IFCTEXTUREVERTEXLIST,
    IFCTIMEPERIOD,
    IFCTIMESERIES,
    IFCTIMESERIESVALUE,
    IFCTOPOLOGICALREPRESENTATIONITEM,
    IFCTOPOLOGYREPRESENTATION,
    IFCTOROIDALSURFACE,
    IFCTRANSFORMER,
    IFCTRANSFORMERTYPE,
    IFCTRANSITIONCURVESEGMENT2D,
    IFCTRANSPORTELEMENT,
    IFCTRANSPORTELEMENTTYPE,
    IFCTRAPEZIUMPROFILEDEF,
    IFCTRIANGULATEDFACESET,
    IFCTRIANGULATEDIRREGULARNETWORK,
    IFCTRIMMEDCURVE,
    IFCTUBEBUNDLE,
    IFCTUBEBUNDLETYPE,
    IFCTYPEOBJECT,
    IFCTYPEPROCESS,
    IFCTYPEPRODUCT,
    IFCTYPERESOURCE,
    IFCUSHAPEPROFILEDEF,
    IFCUNITASSIGNMENT,
    IFCUNITARYCONTROLELEMENT,
    IFCUNITARYCONTROLELEMENTTYPE,
    IFCUNITARYEQUIPMENT,
    IFCUNITARYEQUIPMENTTYPE,
    IFCVALVE,
    IFCVALVETYPE,
    IFCVECTOR,
    IFCVERTEX,
    IFCVERTEXLOOP,
    IFCVERTEXPOINT,
    IFCVIBRATIONDAMPER,
    IFCVIBRATIONDAMPERTYPE,
    IFCVIBRATIONISOLATOR,
    IFCVIBRATIONISOLATORTYPE,
    IFCVIRTUALELEMENT,
    IFCVIRTUALGRIDINTERSECTION,
    IFCVOIDINGFEATURE,
    IFCWALL,
    IFCWALLELEMENTEDCASE,
    IFCWALLSTANDARDCASE,
    IFCWALLTYPE,
    IFCWASTETERMINAL,
    IFCWASTETERMINALTYPE,
    IFCWINDOW,
    IFCWINDOWLININGPROPERTIES,
    IFCWINDOWPANELPROPERTIES,
    IFCWINDOWSTANDARDCASE,
    IFCWINDOWSTYLE,
    IFCWINDOWTYPE,
    IFCWORKCALENDAR,
    IFCWORKCONTROL,
    IFCWORKPLAN,
    IFCWORKSCHEDULE,
    IFCWORKTIME,
    IFCZSHAPEPROFILEDEF,
    IFCZONE,
    IFCROOT,
    IFCROUNDEDRECTANGLEPROFILEDEF,
    IfcRelDefinesByObject,
    IfcRelDefinesByProperties,
} from "web-ifc";
import { IfcViewerAPI } from "web-ifc-viewer";


// List of categories names
const filtredCategories = {

};
//#region IMPOSTO THREE JS SCENA, CAMERA
//Creates the Three.js scene
const scene = new Scene();

//Object to store the size of the viewport
const size = {
    width: window.innerWidth,
    height: window.innerHeight,
};

//Creates the camera (point of view of the user)
const camera = new PerspectiveCamera(75, size.width / size.height);
camera.position.z = 15;
camera.position.y = 13;
camera.position.x = 8;

//Creates the lights of the scene
const lightColor = 0xffffff;

const ambientLight = new AmbientLight(lightColor, 0.5);
scene.add(ambientLight);

const directionalLight = new DirectionalLight(lightColor, 2);
directionalLight.position.set(0, 10, 0);
scene.add(directionalLight);

//Sets up the renderer, fetching the canvas of the HTML
const threeCanvas = document.getElementById("three-canvas");
const renderer = new WebGLRenderer({ canvas: threeCanvas, alpha: true });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//Creates grids and axes in the scene
const grid = new GridHelper(40, 30);
scene.add(grid);

const axes = new AxesHelper();
axes.material.depthTest = false;
axes.renderOrder = 1;
scene.add(axes);

//Creates the orbit controls (to navigate the scene)
const controls = new OrbitControls(camera, threeCanvas);
controls.enableDamping = true;
controls.target.set(-2, 0, 0);

//Animation loop
const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};
animate();

//Adjust the viewport to the size of the browser
window.addEventListener("resize", () => {
    (size.width = window.innerWidth), (size.height = window.innerHeight);
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
});

//#endregion

//IFC Loading
const ifcModels = [];
const loader = new IFCLoader();
loader.ifcManager.useWebWorkers(true, "./IFCWorker.js");
const input = document.getElementById("file-input");
projCategories = [];
let model;
let walls = "";

input.addEventListener('change', async() => {
    const file = input.files[0];
    const url = URL.createObjectURL(file);
    model = await loader.loadAsync(url);
    scene.add(model);
    //cache di tutti i type presenti nel modello 
    const spatialtree = await loader.ifcManager.getSpatialStructure(model.modelID, false);
    //restituisce tutti gli ifctype presenti nel progetto!
    AllCatsProjects(spatialtree);
    console.log(projCategories);
    // createVisibilityMenu(projCategories);

    ifcModels.push(model);
    // model.removeFromParent();
    // setupAllCategories(categorie);
    const chacheOfParameters = cacheOfPropertySets(loader.ifcManager, model.modelID, projCategories);

    walls = await loader.ifcManager.getAllItemsOfType(model.modelID, IFCWALLSTANDARDCASE, true);
    const table = document.getElementById("bim-table");
    const body = table.querySelector("tbody");

    for (const wall of walls) {

        createNameEntry(body, wall);
        for (let propertyName in wall) {
            const propertyValue = wall[propertyName];
            createElsPropertyEntry(body, propertyName, propertyValue);
        }

    }




})
setupProgressBar();


function createNameEntry(table, wall) {
    const row = document.createElement("tr");
    table.appendChild(row);

    const wallName = document.createElement("td");
    wallName.colSpan = 4;
    wallName.textContent = "Elemento: " + wall.GlobalId.value
    row.appendChild(wallName);
}

function createElsPropertyEntry(tableBody, name, value) {
    const row = document.createElement("tr");
    tableBody.appendChild(row);

    const propertyName = document.createElement("td");

    const Elname = decodeIFCString(name);
    propertyName.textContent = Elname;
    row.appendChild(propertyName);

    if (value === null || value === undefined) value = "Unknown"
    if (value.value) value = value.value;
    value = decodeIFCString(value);

    const propertyValue = document.createElement("td");
    propertyValue.textContent = value;
    row.appendChild(propertyValue);

}

//Decodificare alcune stringhe IFC
function decodeIFCString(ifcString) {
    const ifcUnicodeRegEx = /\\X2\\(.*?)\\X0\\/uig;
    let resultString = ifcString;
    let match = ifcUnicodeRegEx.exec(ifcString);
    while (match) {
        const unicodeChar = String.fromCharCode(parseInt(match[1], 16));
        resultString = resultString.replace(match[0], unicodeChar);
        match = ifcUnicodeRegEx.exec(ifcString);
    }
    return resultString;
}


//Seleziono gli elementi
loader.ifcManager.setupThreeMeshBVH(computeBoundsTree, disposeBoundsTree, acceleratedRaycast);
const raycaster = new Raycaster();
raycaster.firstHitOnly = true;
const mouse = new Vector2();

//Algebra lineare per selezionare gli elmeneti dal moude (ho il canvas + lo schermo)
function cast(event) {
    // Computes the position of the mouse on the screen
    const bounds = threeCanvas.getBoundingClientRect();

    const x1 = event.clientX - bounds.left;
    const x2 = bounds.right - bounds.left;
    mouse.x = (x1 / x2) * 2 - 1;

    const y1 = event.clientY - bounds.top;
    const y2 = bounds.bottom - bounds.top;
    mouse.y = -(y1 / y2) * 2 + 1;

    // Places it on the camera pointing to the mouse
    raycaster.setFromCamera(mouse, camera);

    // Casts a ray
    //(SM) ritorna solo il primo modello?
    return raycaster.intersectObjects(ifcModels)[0];
}

//#region MATERIALI

const hilghtMaterial = new MeshBasicMaterial({
    transparent: true,
    opacity: 0.3,
    color: 0xf09e47,
    depthTest: false
})

const selMaterial = new MeshBasicMaterial({
        transparent: true,
        opacity: 0.6,
        color: 0xe26524,
        depthTest: false
    })
    //#endregion



async function cacheOfPropertySets(manager, modelId, typeObjList) {
    var hasmapCachePropertySets = new Map();
    var relDefinesByProperties = await manager.getAllItemsOfType(modelId, IFCRELDEFINESBYPROPERTIES, true);

    for (rel of relDefinesByProperties) {
        var relatedObjects = rel.RelatedObjects;
        for (relObj of relatedObjects) {
            var type = await manager.getIfcType(modelId, relObj.value);
            if (typeObjList.includes(type.toUpperCase())) {
                var prop = await manager.getItemProperties(modelId, rel.RelatingPropertyDefinition.value, true);
                if (hasmapCachePropertySets.has(type, relObj.value)) {
                    var arrayPsetQset = hasmapCachePropertySets.get(type, relObj.value);
                    try {
                        arrayPsetQset.push({ "type": type, "name": rel.Name.value, "prop": prop })

                    } catch (err) {

                        arrayPsetQset.push({ "type": type, "prop": prop })
                    }
                    hasmapCachePropertySets.set(type, relObj.value, arrayPsetQset);
                } else {
                    try {
                        hasmapCachePropertySets.set(type, relObj.value, [{ "type": type, "name": rel.Name.value, "prop": prop }]);

                    } catch (err) {

                        hasmapCachePropertySets.set(relObj.value, [{ "type": type, "prop": prop }]);
                    }
                }
            }

        }
    }
    console.log(hasmapCachePropertySets);
    return hasmapCachePropertySets;
}



//Funzione che avviene ad ogni click
let lastModel;
async function pick(event, material, leggiprop) {
    const found = cast(event);
    if (found) {
        const index = found.faceIndex;
        lastModel = found.object;
        const geometry = found.object.geometry;
        const id = loader.ifcManager.getExpressId(geometry, index);


        if (leggiprop) {
            const props = await loader.ifcManager.getItemProperties(found.object.modelID, id);
            console.log(props);
            // output.innerHTML = JSON.stringify(props, null, 2);

            const psets = await loader.ifcManager.getPropertySets(found.object.modelID, id);
            const realValues = [];
            for (const pset of psets) {
                try {

                    for (const p of pset.HasProperties) {
                        const id_prop = p.value;
                        const val = await loader.ifcManager.getItemProperties(found.object.modelID, id_prop);
                        realValues.push(val);
                    }
                    pset.HasProperties = realValues;
                } catch (err) {}
            }
            console.log(psets);

            createPropertiesMenu(realValues);

            const buildingsidIds = await loader.ifcManager.getAllItemsOfType(found.object.modelID, IFCBUILDING);
            const buildingProps = []
            for (const buildingId of buildingsidIds) {
                const buildingprop = await loader.ifcManager.getItemProperties(found.object.modelID, buildingId);
                buildingProps.push(buildingprop);
            }
            console.log(buildingProps);
            const projectsidIds = await loader.ifcManager.getAllItemsOfType(found.object.modelID, IFCPROJECT);
            console.log(projectsidIds);
        }

        const subset = loader.ifcManager.subsets.createSubset({
            modelID: found.object.modelID,
            material: material,
            ids: [id],
            scene,
            removePrevious: true
        })
    } else if (lastModel) {
        loader.ifcManager.removeSubset(lastModel.modelID, material);
        lastModel = undefined;
    }
}

function setupProgressBar() {
    const text = document.getElementById("progress__text")
    loader.ifcManager.setOnProgress((event) => {
        const percent = event.loaded / event.total * 100;
        const formatted = Math.trunc(percent);

        const percentbar = document.getElementById("progress__fill")

        percentbar.style.width = formatted + "%";
        text.innerText = formatted + "%";

    })
}

const propsGUI = document.getElementById("ifc-property-menu-root");
const viewGUI = document.getElementById("viewer-container");

function AllCatsProjects(project) {
    const childrens = project.children;
    try {
        for (const children of childrens) {
            if (!projCategories.includes(children.type)) {
                projCategories.push(children.type);
                AllCatsProjects(children)
            }
        }
    } catch (err) {

    }
}




//ottiene il nome dall'id della categoria
// Gets the name of a category
function getName(category) {
    const names = Object.keys(categorie)
    return names.find(name => categorie[name] === category);
}

async function getall(category) {
    return loader.ifcManager.getAllItemsOfType(model.modelID, category, false);
}

async function newSubsetOfType(category) {
    const ids = await getall(category);
    return loader.ifcManager.createSubset({
        modelID: model.modelID,
        scene,
        ids,
        removePrevious: true,
        customID: category.toString()
    })
}

// Stores the created subsets
const subsets = {};
async function setupAllCategories(cats) {
    const projCategories = Object.values(cats);
    for (let i = 0; i < projCategories.length; i++) {
        const category = projCategories[i];
        await setupCategory(category);
    }
}

// Creates a new subset and configures the checkbox
async function setupCategory(category) {
    subsets[category] = await newSubsetOfType(category);
    setupCheckBox(category);
}

// Sets up the checkbox event to hide / show elements
function setupCheckBox(category) {
    const name = getName(category);
    const checkBox = document.getElementById(name);
    checkBox.addEventListener('change', (event) => {
        const checked = event.target.checked;
        const subset = subsets[category];
        if (checked) scene.add(subset);
        else subset.removeFromParent();
    });
}



function createVisibilityMenu(category) {
    for (const c of category) {

        const checkbox = document.createElement("input");
        checkbox.id = c.toString();
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("checked", "true");
        const label = document.createElement("label");
        label.textContent = c.toString();
        const linebreak = document.createElement("br");




        viewGUI.appendChild(checkbox);
        viewGUI.appendChild(label);
        viewGUI.appendChild(linebreak);
    }
}

function createPropertiesMenu(properties) {
    console.log(properties);

    removeAllChildren(propsGUI);

    const psets = properties.psets;
    const mats = properties.mats;
    const type = properties.type;

    delete properties.psets;
    delete properties.mats;
    delete properties.type;


    for (let key of properties) {
        createPropertyEntry(key.Name, key.NominalValue);
    }

}

function createPropertyEntry(key, value) {
    const propContainer = document.createElement("div");
    propContainer.classList.add("ifc-property-item");

    if (value === null || value === undefined) value = "undefined";
    else if (value.value) value = value.value;

    const keyElement = document.createElement("div");
    keyElement.textContent = key.value;
    propContainer.appendChild(keyElement);

    const valueElement = document.createElement("div");
    valueElement.classList.add("ifc-property-value");
    const valuedecod = decodeIFCString(value)
    valueElement.textContent = valuedecod;
    propContainer.appendChild(valueElement);

    propsGUI.appendChild(propContainer);
}

function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}


threeCanvas.ondblclick = (event) => pick(event, selMaterial, true);
threeCanvas.onmousemove = (event) => pick(event, hilghtMaterial, false);