import { createSelector } from 'reselect'

/**
 * Direct selector to the bucket state domain
 */
const selectBucketDomain = () => (state) => state.get('buckets')

/**
 * Other specific selectors
 */

/**
 * Default selector used by Bucket
 */

const selectProductCategories = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('categories')
)

const selectBrands = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('brands')
)

const selectFeaturedCategories = () => createSelector(
  selectProductCategories(),
  (substate) => substate.filter((state) => state.get('isFeatured')).slice(0, 4)
)

const selectFeaturedBrands = () => createSelector(
  selectBrands(),
  (substate) => substate.filter((state) => state.get('isFeatured')).slice(0, 8)
)

const selectToggle = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('toggle')
)

const selectMobileNumbers = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('mobileNumbers')
)

const selectReceiptsUpdated = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('receiptsUpdated')
)

const selectToggleError = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('toggleError')
)

const selectToggleMessage = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('toggleMessage')
)

const selectLoader = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('loader')
)

const selectBrandLoader = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('brandLoader')
)

const selectRouteName = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('routeName')
)

const selectPageTitle = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('pageTitle')
)

const selectFullScreenHeader = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('headerMenuFullScreen')
)

const selectShowSearchIcon = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('searchIconShow')
)

const selectShowPointsIcon = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('pointsIconShow')
)

const selectShowActivityIcon = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('activityIconShow')
)

const selectIsRegisteredPush = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('isRegisteredPush')
)

const selectLoyaltyToken = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('loyaltyToken')
)

const selectLightBoxImage = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('lightBoxImage')
)

const selectSearchValue = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('searchValue')
)

const selectCategoryNavLoader = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('categoryNavLoader')
)

export {
  selectBucketDomain,
  selectToggle,
  selectBrands,
  selectProductCategories,
  selectFeaturedCategories,
  selectFeaturedBrands,
  selectMobileNumbers,
  selectReceiptsUpdated,
  selectToggleError,
  selectToggleMessage,
  selectLoader,
  selectRouteName,
  selectPageTitle,
  selectFullScreenHeader,
  selectShowSearchIcon,
  selectShowPointsIcon,
  selectShowActivityIcon,
  selectIsRegisteredPush,
  selectLoyaltyToken,
  selectBrandLoader,
  selectLightBoxImage,
  selectSearchValue,
  selectCategoryNavLoader
}
