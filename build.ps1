param (
    [string]$action = "build"
)

Function Clean($browser) {
	Write-Output "Cleaning destination folder..."
	Remove-Item -Force -Recurse (".\target\" + $browser) 
}

Function MozManifest() {
	Get-Content .\manifest.json | Where-Object {$_ -notmatch 'EDGE'} | Set-Content ".\target\firefox\manifest.json"
}

Function ChromeManifest() {
	Get-Content .\manifest.json | Where-Object {$_ -notmatch 'EDGE'} | Where-Object {$_ -notmatch 'MOZ'} | Set-Content ".\target\chrome\manifest.json"
}

Function EdgeManifest() {
	Get-Content .\manifest.json | Where-Object {$_ -notmatch 'MOZ'} | Set-Content ".\target\edge\manifest.json"
}

Function Manifest($browser) {
	switch ($browser) {
		'chrome' {
			ChromeManifest;
		}
		'firefox' {
			MozManifest;
		}
		'edge' {
			EdgeManifest;
		}
	}
}

Function Build($browser) {
	Clean($browser);

	Write-Output "Creating target dir for browser: " + $browser
	New-Item -ItemType Directory -Force -Path (".\target\" + $browser)
	New-Item -ItemType Directory -Force -Path (".\build\" + $browser)

    Write-Output "Redeploying resources folder..."
	robocopy  .\resources  (".\target\" + $browser + "\resources")
	
	Write-Output "Redeploying lib folder..."
	robocopy .\lib (".\target\" + $browser + "\lib")

	Write-Output "Deploying views"
	Robocopy.exe .\views (".\target\" + $browser + "\views")

    Write-Output "Creating services directory"
    New-Item -ItemType Directory -Force -Path (".\target\" + $browser + "\services")

	Copy-Item (".\" + $browser + "\api.js") -destination (".\target\" + $browser + "\lib\api.js")
	Copy-Item (".\lib\content.js") -destination (".\target\" + $browser + "\lib\content.js")
	Copy-Item (".\" + $browser + "\background.js") -destination (".\target\" + $browser + "\services\background.js")

	Manifest($browser)

    #Copy-Item (".\" + $browser + "\manifest.json") -destination (".\target\" + $browser + "\manifest.json")

    ZipFiles($browser)
}

function ZipFiles($browser)
{
	Write-Output "Compressing package"
	Compress-Archive -Path (".\target\" + $browser + "\lib") -DestinationPath (".\build\" + $browser + "\mockitMan.zip") -Update
	Compress-Archive -Path (".\target\" + $browser + "\resources") -DestinationPath (".\build\" + $browser + "\mockitMan.zip") -Update
	Compress-Archive -Path (".\target\" + $browser + "\services") -DestinationPath (".\build\" + $browser + "\mockitMan.zip") -Update
	Compress-Archive -Path (".\target\" + $browser + "\views") -DestinationPath (".\build\" + $browser + "\mockitMan.zip") -Update
	Compress-Archive -Path (".\target\" + $browser + "\manifest.json") -DestinationPath (".\build\" + $browser + "\mockitMan.zip") -Update
}

$browsers = ("chrome", "firefox", "edge")

foreach ($browser in $browsers) {
	switch ($action) {
		'clean' {
			Clean($browser);
		}
		'build' {
			Build($browser);
		}
		'Package' {
			Package($browser);
		}
	}
}