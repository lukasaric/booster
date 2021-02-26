<template>
  <div class="auth-container">
    <div class="auth-panel-container">
      <v-sheet elevation="0" rounded class="auth-panel">
        <div class="auth-header py-9">
          <div class="d-flex justify-center">
            <v-avatar size="72" color="primary" class="elevation-2">
              <v-icon size="40" color="secondary">mdi-car-outline</v-icon>
            </v-avatar>
          </div>
          <div class="headline-container">
            <h1 class="mt-3 mb-2 text-h5">Booster</h1>
            <v-divider />
            <h2 class="text-subtitle-2">Vehicle management system</h2>
          </div>
        </div>
        <div class="auth-body">
          <router-view />
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<style lang="scss">
.auth-container {
  height: 100%;

  .headline-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .v-divider {
      width: 50%;
      margin-bottom: 0.5rem;
    }
  }
}

.auth-container .auth-panel-container {
  position: relative;
  width: 26rem;
  min-height: 41rem;
  margin: 4% auto;
}

.auth-container .auth-panel.v-sheet {
  position: absolute;
  width: 100%;
  background: rgba($color: #e1e1e1, $alpha: 0.3);
  border: 1px dashed #777;
  z-index: 1;

  .auth-header {
    padding-bottom: 0;
  }

  .auth-body {
    padding: 0.25rem 1.5rem 2rem;

    a {
      color: inherit;
      font-weight: 400;
    }
  }
}

.auth-container .waves-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 15rem;
}
</style>
