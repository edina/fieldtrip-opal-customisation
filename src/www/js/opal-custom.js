/*
Copyright (c) 2015, EDINA
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.
* Neither the name of EDINA nor the names of its contributors may be used to
  endorse or promote products derived from this software without specific prior
  written permission.

THIS SOFTWARE IS PROVIDED BY EDINA ''AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
SHALL EDINA BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
DAMAGE.
*/

"use strict";
/* global cordova */

define(['./pcapi', 'records', 'file'], function(pcapi, records, file){

    var EDITOR = "5106d3aa-99ac-4186-b50d-6fcfdf9946f4.edtr";
    var userId = pcapi.getAnonymousUserId();
    var path = records.getEditorsDir(records.EDITOR_GROUP.PUBLIC);
    var options = {
        "userId": userId,
        "fileName": EDITOR,
        "remoteDir": "editors",
        "localDir": path,
        "targetName": EDITOR
    };

    var fileName = editor.substring(editor.lastIndexOf('/') + 1, editor.length);

    var itemUrl = pcapi.buildUrl(options.remoteDir, options.fileName);
    //if there's a userId then change the userID
    if(options.userId){
        itemUrl = pcapi.buildUserUrl(options.userId, options.remoteDir, options.fileName);
    }

    var target = file.getFilePath(options.localDir)+'/'+options.targetName;

    file.ftDownload(itemUrl, target, function(entry){
        if(entry.name.indexOf(".edtr") > -1){
            records.addEditor(entry, type);
        }
    }, error);
});