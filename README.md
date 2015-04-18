Specref API [![Build Status](https://travis-ci.org/tobie/specref.png?branch=master)](https://travis-ci.org/tobie/specref)
===========

[Specref](http://www.specref.org/) is an open-source, community-maintained database of Web standards & related references.

## API

The API to the service is very simple. It supports four operations which are: 

1.  Get a set of bibliographic references:
    
    [`GET https://specref.herokuapp.com/bibrefs?refs=FileAPI,rfc2119`](https://specref.herokuapp.com/bibrefs?refs=FileAPI,rfc2119)
    
    parameters:
    
        refs=comma-separated,list,of,reference,IDs
        callback=nameOfCallbackFunction
    
    returns: a JSON object indexed by IDs
    
    ```json
    {
        "FileAPI": {
            "authors": [
                "Arun Ranganathan",
                "Jonas Sicking"
            ],
            "date": "12 September 2013",
            "deliveredBy": [
                {
                    "shortname": "webapps",
                    "url": "http://www.w3.org/2008/webapps/"
                }
            ],
            "edDraft": "http://dev.w3.org/2006/webapi/FileAPI/",
            "href": "http://www.w3.org/TR/FileAPI/",
            "id": "FileAPI",
            "publisher": "W3C",
            "status": "LCWD",
            "title": "File API"
        },
        "rfc2119": {
            "authors": [
                "S. Bradner"
            ],
            "date": "March 1997",
            "href": "http://www.ietf.org/rfc/rfc2119.txt",
            "id": "rfc2119",
            "publisher": "IETF",
            "status": "Best Current Practice",
            "title": "Key words for use in RFCs to Indicate Requirement Levels"
        }
    }
    ```
    
2.  Search bibliographic references

    [`GET https://specref.herokuapp.com/search-refs?q=coffee`](https://specref.herokuapp.com/search-refs?q=coffee)
        
    parameters:
    
        q=search%20term
        callback=nameOfCallbackFunction
    
    returns: a JSON object indexed by IDs
    
    ```json
    {
        "rfc2324": {
            "authors": [
                "L. Masinter"
            ],
            "date": "1 April 1998",
            "href": "http://www.ietf.org/rfc/rfc2324.txt",
            "id": "rfc2324",
            "publisher": "IETF",
            "status": "Informational",
            "title": "Hyper Text Coffee Pot Control Protocol (HTCPCP/1.0)"
        },
        "rfc7168": {
            "authors": [
                "I. Nazar"
            ],
            "date": "1 April 2014",
            "href": "http://www.ietf.org/rfc/rfc7168.txt",
            "id": "rfc7168",
            "publisher": "IETF",
            "status": "Informational",
            "title": "The Hyper Text Coffee Pot Control Protocol for Tea Efflux Appliances (HTCPCP-TEA)"
        }
    }
    ```
    
    Used to get a set of bibliographic references that include the search term in any of their attributes. This is usefull to find specs related to a given area of study, specs by a given editor, etc.
    
3.  Reverse Lookup

    [`GET https://specref.herokuapp.com/reverse-lookup?urls=http://www.w3.org/TR/2012/WD-FileAPI-20121025/`](https://specref.herokuapp.com/reverse-lookup?urls=http://www.w3.org/TR/2012/WD-FileAPI-20121025/)
    
    parameters:

        urls=comma-separated,list,of,reference,URLs.
        callback=nameOfCallbackFunction
    
    returns: a JSON object indexed by URLs
    
    ```json
    {
        "http://www.w3.org/TR/2012/WD-FileAPI-20121025/": {
            "authors": [
                "Arun Ranganathan",
                "Jonas Sicking"
            ],
            "date": "12 September 2013",
            "deliveredBy": [
                {
                    "shortname": "webapps",
                    "url": "http://www.w3.org/2008/webapps/"
                }
            ],
            "edDraft": "http://dev.w3.org/2006/webapi/FileAPI/",
            "href": "http://www.w3.org/TR/FileAPI/",
            "id": "FileAPI",
            "publisher": "W3C",
            "status": "LCWD",
            "title": "File API"
        }
    }
    ```
    
    Notice this finds you the canonical version of a spec and not the precise version the URL points to.
    This is by design.
    
4.  Get a set of definition cross-references [DEPRECATED]. 

        GET https://specref.herokuapp.com/xrefs?refs=comma,seperated,list,of,references
    
    parameters:

        refs=comma-separated,list,of,reference,IDs
        callback=nameOfCallbackFunction

    returns: a JSON object indexed by IDs

## CORS

**CORS is enabled for all origins.** By default the service returns JSON data, which is great but not convenient for browsers that do not support CORS yet. For those, simply adding the `callback` parameter with the name of the callback function you want will switch the response to JSON-P.

## Examples

Some examples should help: 

    // get references for SVG, REX, and DAHUT
    GET https://specref.herokuapp.com/bibrefs?refs=SVG,REX,DAHUT
    
    // the same as JSON-P
    GET https://specref.herokuapp.com/bibrefs?refs=SVG,REX,DAHUT&callback=yourFunctionName
    
    // get cross-references for the CSS Object Model and File API specifications
    GET https://specref.herokuapp.com/xrefs?refs=cssom,fileapi
    
    // the same as JSON-P
    GET https://specref.herokuapp.com/xrefs?refs=cssom,fileapi&callback=yourFunctionName
            
If you need to find a reference ID (for either bibliographic or cross-references) you need to either lift it from an existing specification, or to find it in the source database. Where to get the latter is explained below. Please note that the identifiers for bibliographic references are not the same as for definition cross-references, and that just because a specification is featured in one does not mean it is also in the other. (Historically, those were two separate databases that were merged. Or, if you really insist on accuracy, the CSS bibref DB was converted into the ReSpec JS DB; the latter was extensively extended and edited, forked into the Specifiction database which was edited, then into the ReSpec v3 database which was also edited, then much of those were merged; in a parallel universe the Anolis bibliographical and cross-reference databases were developed; then all of these were merged into this service. So stop whining and delight in the consistency that you do have.) 

## Updating & Adding

### Daily Auto-Updating

There are scripts that pull fresh data from IETF and W3C and update `biblio.json`. These are now run daily. Their output is tested, comitted and deployed without human intervention. Content should now always be up to date.

### Manual Changes

You can make modifications to the databases simply by editing either `biblio.json` or `xrefs.json` in the [GitHub repository](https://github.com/tobie/specref). 

In order to do so you can fork the project and make a pull request to update it, or you can ask to be added as a project collaborator (we're pretty open about that) in which case you'll be able to push changes directly.

In both cases, all changes are automatically tested using [travis](https://travis-ci.org/tobie/specref/). If all tests pass, the changes are immediately (and automaitcally) deployed.

Some rules to observe when editing the databases follow. 

For both DBs: 

*   Before committing, make sure that your JSON is well-formed. Syntax-check it with a tool or some such. Broken JSON means it stops being synchronised to the DB, thereby annoying everyone, and it can even cause the service to stop functioning. Remember: we know unsavoury characters world-wide, and we can find out where you live. 
*   Don't remove entries unless you are 100% certain that no one is using it. Typically that only applies to cases in which you have just added a reference and want to remove it. This applies even if you find a duplicate entry — there are a few, such is life. 
*   Don't duplicate entries. Make treble-sure that what you want to add is not in the DB. Certainly don't add a duplicate entry just because you don't like the reference short name. 

For the cross-references DB: 

*   Entries in this database are typically automatically generated from a specification. If you find yourself hand-editing something here it is quite possible that you may be doing something wrong. Get in touch and we'll figure it out. 

For the bibliographical references DB: 

* Please use structured objects instead of raw strings as much as you possibly can.
* When you want to update an existing reference, if you see that it uses the old string style, please convert it to a structured object. 
* References in this database are expected to be to the “latest and greatest” version of a given specification. In some cases this may be the draft residing in the editor's repository, or it may be the latest snapshot as published by a Working Group into TR — this choice is left to your appreciation. If you really, *really* want to have a reference to a dated version, then use the `versions` property like so:

```js
{
    "REFID": {
        "versions": {
            "YYYYMMDD": {
                "href": "http://..."
            }
        }
    }, //...
}
```
