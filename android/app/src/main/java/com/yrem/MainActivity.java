package com.yrem;
import com.burnweb.rnpermissions.RNPermissionsPackage;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "yrem";
    }
    @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
      RNPermissionsPackage.onRequestPermissionsResult(requestCode, permissions, grantResults); // very important event callback 
      super.onRequestPermissionsResult(requestCode, permissions, grantResults);
  }
}
